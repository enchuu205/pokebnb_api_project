// backend/routes/api/spots.js
const express = require('express')

const { Spot, SpotImage, Review, User } = require('../../db/models');
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
        let spotImg = await SpotImage.findOne({
            where: {
                spotId: spots[i].id
            }
        })
        spotImg.preview ? spots[i].setDataValue('previewImage', spotImg.url) : spots[i].setDataValue('previewImage', null)
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
        let spotImg = await SpotImage.findOne({
            where: {
                spotId: spots[i].id
            }
        })
        spotImg.preview ? spots[i].setDataValue('previewImage', spotImg.url) : spots[i].setDataValue('previewImage', null)
    }

    return res.json({
        Spots: spots,
    })
})

module.exports = router;
