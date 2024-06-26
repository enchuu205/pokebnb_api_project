import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadSpotsThunk } from "../../store/spots";
import './LandingPage.css'

import { ManageContext } from "../../context/Manage";

import { AiFillStar } from "react-icons/ai";
import { Tooltip } from 'react-tooltip'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const spotsObj = useSelector((state) => state.spots)
    let spots = Object.values(spotsObj)
    // console.log(spots)

    // Manage spots tester
    const { manage, setManage } = useContext(ManageContext)

    const currentUser = useSelector((state) => state.session.user)

    if (manage && currentUser) {
        spots = spots.filter((spot) => spot.ownerId === currentUser.id)
    }

    const spotRouteChange = (spot) => {
        navigate(`/spots/${spot.id}`)
    }

    function createSpotButton() {
        setManage(false)
        navigate('/spots/new')
    }

    useEffect(() => {
        dispatch(loadSpotsThunk())
    }, [dispatch])

    const spotBlockCreator = spots.map((spot) => {
        return (
            <div
                className='spot-container'
                key={spot.id}
            >
                <div
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
                {manage &&
                    <button className='update-button' onClick={() => navigate(`/spots/${spot.id}/edit`)}>
                        Update
                    </button>}
                {manage &&
                    <button className="delete-button">
                        <OpenModalMenuItem
                            itemText='Delete'
                            modalComponent={<DeleteSpotModal spot={spot} />}
                        />
                    </button>}
            </div>
        )
    })

    return (
        <>
            {manage && <h2>Manage Spots</h2>}
            {manage && spots.length === 0 && <button className='create-spot-button-manage' onClick={() => createSpotButton()}>Create a New Spot</button>}
            {/* {manage && <button onClick={() => setManage(false)}>Return to all spots</button>} */}
            <div className="all-spots-container">{spotBlockCreator}</div>
        </>
    )
}

export default LandingPage
