import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotsThunk } from "../../store/spots";
import './LandingPage.css'
import { AiFillStar } from "react-icons/ai";

function LandingPage() {
    const dispatch = useDispatch();
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)
    // console.log(spots)

    useEffect(() => {
        dispatch(loadSpotsThunk())
    }, [dispatch])

    const spotBlockCreator = spots.map((spot) => {
        return (
            <div key={spot.id} className='spot-container'>
                <img src={spot.previewImage} className='spot-preview-image' />
                <div className='spot-description-container'>
                    <div>{spot.city}, {spot.state}</div>
                    <div><AiFillStar />{spot.avgRating && Number(spot.avgRating).toFixed(1) || 'New'}</div>
                    <div>${spot.price}/night</div>
                </div>
            </div>
        )
    })

    return (
        <>
            <div>Landing Page is Showing</div>
            <div>{spotBlockCreator}</div>
        </>
    )
}

export default LandingPage
