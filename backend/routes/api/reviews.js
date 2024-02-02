// backend/routes/api/reviews.js
const express = require('express')

const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Reviews of the Current User /api/reviews/current
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
                include: {
                    model: SpotImage,
                    as: 'previewImage',
                    attributes: ['url'],
                    where: { preview: true }
                }
            },
            {
                model: ReviewImage,
                attributes: { exclude: ['preview', 'reviewId', 'createdAt', 'updatedAt'] }
            }
        ]
    })
    res.json({ 'Reviews': reviews })
})


module.exports = router;
