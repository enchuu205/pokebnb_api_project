// backend/routes/api/spots.js
const express = require('express')

const { Spot, SpotImage, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    for (i = 0; i < spots.length; i++) {
        // Average Rating
        let reviews = await Review.findAll({
            where: {
                spotId: spots[i].id
            }
        })

        let stars = 0
        let count = 0

        reviews.forEach((review) => {
            stars += review.stars
            count++
        })

        avgRating = stars / count
        spots[i].setDataValue('avgRating', avgRating || null)


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


// const preview = await SpotImage.findAll({
//     where: { preview: true },
//     include: { SpotImage }
// })
