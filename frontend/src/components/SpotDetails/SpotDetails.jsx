import { useParams } from "react-router-dom"
import { loadSpotDetailsThunk } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import Reviews from "../Reviews"

import './SpotDetails.css'

import { AiFillStar } from "react-icons/ai";

function previewImageChecker(spotImage) {
    if (spotImage.preview) return 'preview-image'
    return ''
}

function SpotDetails() {
    let { spotId } = useParams()
    const dispatch = useDispatch()
    const spotDetailsObj = useSelector((state) => state.spots.spotDetails)

    useEffect(() => {
        dispatch(loadSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    const spotImagesCreator = spotDetailsObj?.SpotImages.map((spotImage, index) => {
        return (
            <img key={index} className={'spot-image ' + previewImageChecker(spotImage)} src={spotImage.url} />
        )
    })

    if (!spotDetailsObj) return null

    return (
        <div className="spot-details-container">
            {/* <div>this is the spot id from the website path: {spotId}</div> */}
            <div className="spot-name">{spotDetailsObj.name}</div>
            <div className="spot-location">{spotDetailsObj.city}, {spotDetailsObj.state}, {spotDetailsObj.country}</div>
            <div className="spot-images-container">
                <>{spotImagesCreator}</>
            </div>
            <div className="description-reservation-container">
                <div className="description-container">
                    <div className="spot-host">Hosted by {spotDetailsObj.Owner.firstName + ' ' + spotDetailsObj.Owner.lastName}</div>
                    <div>{spotDetailsObj.description}</div>
                </div>
                <div className="reservation-container">
                    <div className="spot-price-reviews-container">
                        <span><span className="spot-price">${spotDetailsObj.price}</span> night</span>
                        <div><AiFillStar /> {spotDetailsObj.avgStarRating && Number(spotDetailsObj.avgStarRating).toFixed(1) + ` · ` + spotDetailsObj.numReviews + ` review${spotDetailsObj.numReviews > 1 ? 's' : ''}` || 'New'}</div>
                    </div>
                    <button className='reserve-button' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                </div>
            </div>
            <hr></hr>
            <div className="reviews-overall"><AiFillStar /> {spotDetailsObj.avgStarRating && Number(spotDetailsObj.avgStarRating).toFixed(1) + ` · ` + spotDetailsObj.numReviews + ` review${spotDetailsObj.numReviews > 1 ? 's' : ''}` || 'New'}</div>
            <Reviews />
        </div>
    )
}

export default SpotDetails
