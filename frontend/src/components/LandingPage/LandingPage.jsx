import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotsThunk } from "../../store/spots";

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
            <div key={spot.id}>
                <>{spot.name}</>
                <>{spot.city}, {spot.state}</>
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
