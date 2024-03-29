const express = require('express')

const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Delete a Spot Image /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req
    const { imageId } = req.params

    const spotImg = await SpotImage.findOne({ where: { id: imageId } })
    if (!spotImg) return res.status(404).json({ message: `Spot Image couldn't be found` })

    const spot = await Spot.findOne({ where: { id: spotImg.spotId } })
    console.log(spot.ownerId, user.id)
    if (spot.ownerId != user.id) return res.status(403).json({ message: "Forbidden" })

    await spotImg.destroy()

    return res.json({ message: "Successfully deleted" })
})

module.exports = router;
