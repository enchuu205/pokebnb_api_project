// backend/routes/api/spots.js
const express = require('express')

const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

function avgRating(reviews) {
    let stars = 0
    let count = 0

    reviews.forEach((review) => {
        stars += review.stars
        count++
    })
    return stars / count
}

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Country is required"),
    check('lat')
        .notEmpty()
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude must be within -90 and 90"),
    check('lng')
        .notEmpty()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude must be within -180 and 180"),
    check('name')
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ max: 49 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Description is required"),
    check('price')
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("Price per day must be a positive number"),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isString()
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

// Create a Booking from a Spot based on the Spot's id /api/spots/:spotId/bookings
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req
    let { spotId } = req.params
    const { startDate, endDate } = req.body

    spotId = parseInt(spotId)

    const booking = await Booking.create({
        spotId,
        userId: user.id,
        startDate,
        endDate
    })
    return res.json(booking)
})

// Get all Bookings for a Spot based on the Spot's id /api/spots/:spotId/bookings
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req
    let { spotId } = req.params
    let bookings = null

    const spot = await Spot.findOne({ where: { id: spotId } })
    if (!spot) return res.status(404).json({ message: `Spot couldn't be found` })

    spotId = parseInt(spotId)
    console.log(spot)

    //If you ARE the owner of the spot.
    if (spot.ownerId === user.id) {
        bookings = await Booking.findAll({
            where: { spotId: spotId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })
    } else {
        // If you ARE NOT the owner of the spot.
        bookings = await Booking.findAll({
            where: { spotId: spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        })
    }
    return res.json({ Bookings: bookings })
})


// Create a Review for a Spot based on the Spot's id /api/spots/:spotId/reviews
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { user } = req
    let { spotId } = req.params
    const { review, stars } = req.body

    const spot = await Spot.findOne({ where: { id: spotId } })
    if (!spot) return res.status(404).json({ message: `Spot couldn't be found` })

    const existReview = await Review.findOne({ where: { userId: user.id, spotId: spotId } })
    if (existReview) return res.status(500).json({ message: "User already has a review for this spot" })

    spotId = parseInt(spotId)

    const newReview = await Review.create({ userId: user.id, spotId: spotId, review, stars })

    return res.status(201).json(newReview)
})


// Get all Reviews by a Spot's id /api/spots/:spotId/reviews
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params

    const spot = await Spot.findOne({ where: { id: spotId } })
    if (!spot) return res.status(404).json({ message: `Spot couldn't be found` })

    const reviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: { exclude: ['preview', 'reviewId', 'createdAt', 'updatedAt'] }
            }
        ]
    })
    return res.json({ Reviews: reviews })
})

// Add an Image to a Spot based on the Spot's id /api/spots/:spotId/images
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { url, preview } = req.body
    const { user } = req;

    const spot = await Spot.findOne({ where: { id: spotId } })
    if (!spot) return res.status(404).json({ message: `Spot couldn't be found` })
    if (spot.ownerId != user.id) return res.status(403).json({ message: "Forbidden" })



    const newSpotImg = await SpotImage.create({ spotId: spot.id, url, preview })

    return res.json({ id: newSpotImg.spotId, url: newSpotImg.url, preview: newSpotImg.preview })

})


// Create a Spot /api/spots
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const { user } = req;
    const ownerId = user.id

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json(newSpot)
})



// Get all Spots owned by the Current User /api/spots/current
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const spots = await Spot.findAll({ where: { ownerId: user.id } })

    for (i = 0; i < spots.length; i++) {
        // Average Rating
        let reviews = await Review.findAll({
            where: {
                spotId: spots[i].id
            }
        })
        spots[i].setDataValue('avgRating', avgRating(reviews) || null)


        // Spot Image Preview
        let spotImgPreview = await SpotImage.findOne({
            where: {
                spotId: spots[i].id,
                preview: true
            }
        })
        spotImgPreview ? spots[i].setDataValue('previewImage', spotImgPreview.url) : spots[i].setDataValue('previewImage', null)
    }

    return res.json({
        Spots: spots,
    })
})

// Get details of a Spot from an id /api/spots/:spotId
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findOne({ where: { id: spotId } })

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    const spotImgs = await SpotImage.findAll({ where: { spotId: spotId }, attributes: ['id', 'url', 'preview'] })
    const owner = await User.findOne({ where: { id: spot.ownerId }, attributes: ['id', 'firstName', 'lastName'] })

    let review = await Review.findAll({
        where: {
            spotId: spot.id
        }
    })
    spot.setDataValue('SpotImages', spotImgs || null)
    spot.setDataValue('numReviews', review.length || 0)
    spot.setDataValue('avgRating', avgRating(review) || null)
    spot.setDataValue('Owner', owner || null)

    return res.json(spot)
})


// Get all spots /api/spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    for (i = 0; i < spots.length; i++) {
        // Average Rating
        let reviews = await Review.findAll({
            where: {
                spotId: spots[i].id
            }
        })
        spots[i].setDataValue('avgRating', avgRating(reviews) || null)

        // Spot Image Preview
        let spotImgPreview = await SpotImage.findOne({
            where: {
                spotId: spots[i].id,
                preview: true
            }
        })
        spotImgPreview ? spots[i].setDataValue('previewImage', spotImgPreview.url) : spots[i].setDataValue('previewImage', null)
    }

    return res.json({
        Spots: spots,
    })
})

// Edit a Spot /api/spots/:spotId
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req

    const spot = await Spot.findOne({ where: { id: spotId } })
    if (!spot) return res.status(404).json({ message: `Spot couldn't be found` })
    if (spot.ownerId != user.id) return res.status(403).json({ message: "Forbidden" })

    address ? spot.address = address : spot.address
    city ? spot.city = city : spot.city
    state ? spot.state = state : spot.state
    country ? spot.country = country : spot.country
    lat ? spot.lat = lat : spot.lat
    lng ? spot.lng = lng : spot.lng
    name ? spot.name = name : spot.name
    description ? spot.description = description : spot.description
    price ? spot.price = price : spot.price

    await spot.save()

    return res.json(spot)
})

// Delete a Spot /api/spots/:spotId
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { user } = req

    const spot = await Spot.findOne({ where: { id: spotId } })
    if (!spot) return res.status(404).json({ message: `Spot couldn't be found` })
    if (spot.ownerId != user.id) return res.status(403).json({ message: "Forbidden" })

    await spot.destroy()

    return res.json({ message: "Successfully deleted" })
})

module.exports = router;
