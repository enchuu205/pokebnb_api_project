const express = require('express')

const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Delete a Spot /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req
    const { imageId } = req.params

    const reviewImg = await ReviewImage.findOne({ where: { id: imageId } })
    if (!reviewImg) return res.status(404).json({ message: `Review Image couldn't be found` })

    const review = await Review.findOne({ where: { id: reviewImg.reviewId } })
    if (review.userId != user.id) return res.status(403).json({ message: "Forbidden" })

    await reviewImg.destroy()

    return res.json({ message: "Successfully deleted" })
})


module.exports = router;
