import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadSpotsThunk } from "../../store/spots";
import './LandingPage.css'

import { AiFillStar } from "react-icons/ai";
import { Tooltip } from 'react-tooltip'

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)

    const spotRouteChange = (spot) => {
        navigate(`/spots/${spot.id}`)
    }

    useEffect(() => {
        dispatch(loadSpotsThunk())
    }, [dispatch])

    const spotBlockCreator = spots.map((spot) => {
        return (
            <div
                key={spot.id}
                className='spot-container'
                onClick={() => spotRouteChange(spot)}
                data-tooltip-id='spot-tooltip'
                data-tooltip-content={spot.name}
                data-tooltip-offset={15}
            >
                <Tooltip id='spot-tooltip' />
                <img src={spot.previewImage} className='spot-preview-image' />
                <div className='spot-description-container'>
                    <div className='spot-location-reviews-container'>
                        <div>{spot.city}, {spot.state}</div>
                        <div><AiFillStar />{spot.avgRating && Number(spot.avgRating).toFixed(1) || 'New'}</div>
                    </div>
                    <div><span className="spot-price">${spot.price}</span> night</div>
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="all-spots-container">{spotBlockCreator}</div>
        </>
    )
}

export default LandingPage
