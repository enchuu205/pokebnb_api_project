import { useParams } from "react-router-dom"
import { loadSpotDetailsThunk } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import Reviews from "../Reviews"

import './SpotDetails.css'

import { AiFillStar } from "react-icons/ai";

function previewImageChecker(spotImage) {
    if (spotImage.preview) return 'preview-image'
}

function SpotDetails() {
    let { spotId } = useParams()
    const dispatch = useDispatch()
    const spotDetailsObj = useSelector((state) => state.spots.spotDetails)
    console.log('hello!!!!!!', spotDetailsObj)

    useEffect(() => {
        dispatch(loadSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    const spotImagesCreator = spotDetailsObj?.SpotImages.map((spotImage, index) => {
        return (
            <img key={index} className={'spot-detail-image ' + previewImageChecker(spotImage)} src={spotImage.url} />
        )
    })

    if (!spotDetailsObj) return null

    return (
        <>
            <div>this is the spot id from the website path: {spotId}</div>
            <div className="spot-images-container">
                <>{spotImagesCreator}</>
            </div>
            <div>Hosted By {spotDetailsObj.Owner.firstName + ' ' + spotDetailsObj.Owner.lastName}</div>
            <div>${spotDetailsObj.price} night</div>
            <div><AiFillStar /> {Number(spotDetailsObj.avgStarRating).toFixed(1)} - {spotDetailsObj.numReviews} reviews</div>
            <button onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
            <hr></hr>
            <div><AiFillStar /> {Number(spotDetailsObj.avgStarRating).toFixed(1)} - {spotDetailsObj.numReviews} reviews</div>
            <Reviews></Reviews>
        </>
    )
}

export default SpotDetails
