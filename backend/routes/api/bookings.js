// backend/routes/api/bookings.js
const express = require('express')

const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Edit a Booking /api/bookings/:bookingId
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req
    const { bookingId } = req.params
    const { startDate, endDate } = req.body

    let existBooking = await Booking.findOne({
        where: { id: bookingId }
    })
    if (!existBooking) return res.status(404).json({ message: "Booking couldn't be found" })

    startDate ? existBooking.startDate = startDate : existBooking.startDate
    endDate ? existBooking.endDate = endDate : existBooking.endDate

    await existBooking.save()

    return res.json(existBooking)
})

// Get all of the Current User's Bookings /api/bookings/current
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    // console.log(user.id)
    const bookings = await Booking.findAll({
        where: { userId: user.id },
        include: {
            model: Spot,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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

        bookings[i].Spot.dataValues.previewImage = spotImgPreview.url
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
        await existBooking.destroy()
        res.json({ message: "Successfully deleted" })
    }
})









module.exports = router;
