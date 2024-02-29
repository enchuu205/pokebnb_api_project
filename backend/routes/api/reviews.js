// backend/routes/api/reviews.js
const express = require('express')

const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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

// Edit a Review /api/reviews/:reviewId
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { user } = req
    let { reviewId } = req.params
    const { review, stars } = req.body

    const existReview = await Review.findOne({ where: { id: reviewId } })
    if (!existReview) return res.status(404).json({ message: "Review couldn't be found" })
    if (existReview.userId != user.id) return res.status(403).json({ message: "Forbidden" })

    review ? existReview.review = review : existReview.review
    stars ? existReview.stars = stars : existReview.stars

    await existReview.save()

    return res.json(existReview)
})

// Add an Image to a Review based on the Review's id /api/reviews/:reviewId/images
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req
    let { reviewId } = req.params
    const { url } = req.body

    const existReview = await Review.findOne({ where: { id: reviewId } })
    if (!existReview) return res.status(404).json({ message: "Review couldn't be found" })
    if (existReview.userId != user.id) return res.status(403).json({ message: "Forbidden" })

    reviewId = parseInt(reviewId)

    const reviewImgs = await ReviewImage.findAll({ where: { reviewId: reviewId } })
    if (reviewImgs.length >= 10) return res.status(403).json({ message: "Maximum number of images for this resource was reached" })

    const newReviewImg = await ReviewImage.create({ reviewId, url })

    return res.json({ id: newReviewImg.id, url: newReviewImg.url })

})


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
                // Issue is that previewImage is  formatted as
                // "previewImage": [{...}, {...}, ...] because there are possible multiple previewImage
                // is it because of lazy loading is better?
                // include: {
                //     model: SpotImage,
                //     as: 'previewImage',
                //     attributes: ['url'],
                //     where: { preview: true }
                // }
            },
            {
                model: ReviewImage,
                attributes: { exclude: ['preview', 'reviewId', 'createdAt', 'updatedAt'] }
            }
        ]
    })

    for (i = 0; i < reviews.length; i++) {
        // Attach Spot Image Preview
        let spotImgPreview = await SpotImage.findOne({
            where: {
                spotId: reviews[i].Spot.id,
                preview: true
            }
        })

        reviews[i].Spot.dataValues.previewImage = spotImgPreview.url
    }

    return res.json({ 'Reviews': reviews })
})

// Delete a Review /api/reviews/:reviewId
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req
    let { reviewId } = req.params

    const existReview = await Review.findOne({ where: { id: reviewId } })
    if (!existReview) return res.status(404).json({ message: "Review couldn't be found" })
    if (existReview.userId != user.id) return res.status(403).json({ message: "Forbidden" })

    await existReview.destroy()

    return res.json({ message: "Successfully deleted" })
})

module.exports = router;
