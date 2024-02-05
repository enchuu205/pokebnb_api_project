// backend/routes/api/bookings.js
const express = require('express')

const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();

const validateStartEndDates = [
    check('startDate')
        .exists({ checkFalsy: true })
        .custom((value, { req }) => {
            let startDateValidate = new Date(value)
            let currentDate = new Date()

            if (startDateValidate < currentDate) {
                return false
            }
            return true
        })
        .withMessage('startDate cannot be in the past'),
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((value, { req }) => {
            let startDateValidate = new Date(req.body.startDate)
            let endDateValidate = new Date(value)

            if (endDateValidate <= startDateValidate) {
                return false
            }
            return true
        })
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
]

// Edit a Booking /api/bookings/:bookingId
router.put('/:bookingId', requireAuth, validateStartEndDates, async (req, res) => {
    const { user } = req
    const { bookingId } = req.params
    const { startDate, endDate } = req.body
    const currentDate = new Date()

    let editBooking = await Booking.findOne({
        where: { id: bookingId }
    })
    if (!editBooking) return res.status(404).json({ message: "Booking couldn't be found" })
    if (user.id != editBooking.userId) return res.status(403).json({ message: 'Forbidden' })

    if (new Date(startDate) < currentDate || new Date(endDate) < currentDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        })
    }

    // Booking Conflict
    const existBooking = await Booking.findOne({
        where: {
            id: { [Op.ne]: bookingId },
            spotId: editBooking.spotId,
            [Op.and]: [
                { startDate: { [Op.lte]: new Date(endDate) } },
                { endDate: { [Op.gte]: new Date(startDate) } }
            ]
        }
    })

    if (existBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            error: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End Date conflicts with an existing booking"
            }
        })
    }

    startDate ? editBooking.startDate = startDate : editBooking.startDate
    endDate ? editBooking.endDate = endDate : editBooking.endDate

    await editBooking.save()

    return res.json(editBooking)
})

// Get all of the Current User's Bookings /api/bookings/current
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    // console.log(user.id)
    const bookings = await Booking.findAll({
        where: { userId: user.id },
        include: {
            model: Spot,
            attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
        }
    })

    for (i = 0; i < bookings.length; i++) {
        // Attach Spot Image Preview
        let spotImgPreview = await SpotImage.findOne({
            where: {
                spotId: bookings[i].Spot.id,
                preview: true
            }
        })
        spotImgPreview ? bookings[i].setDataValue('previewImage', spotImgPreview.url) : bookings[i].setDataValue('previewImage', null)
    }

    return res.json({ 'Bookings': bookings })
})

// Delete a Booking /api/bookings/:bookingId
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req
    const { bookingId } = req.params

    const existBooking = await Booking.findOne({ where: { id: bookingId } })
    if (!existBooking) return res.status(404).json({ message: "Booking couldn't be found" })

    const bookedSpot = await Spot.findOne({ where: { id: existBooking.spotId } })

    // Booking must belong to the current user or the Spot must belong to the current user
    if (user.id === existBooking.userId || user.id === bookedSpot.ownerId) {
        // Bookings that have been started can't be deleted
        if (new Date(existBooking.startDate) <= new Date()) return res.status(403).json({ message: "Bookings that have been started can't be deleted" })

        await existBooking.destroy()
        res.json({ message: "Successfully deleted" })

    } else return res.status(403).json({ message: "Forbidden" })

})









module.exports = router;
