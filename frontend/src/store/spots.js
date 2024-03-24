import { csrfFetch } from "./csrf";

const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const LOAD_SPOT_DETAILS = '/spots/LOAD_SPOT_DETAILS'

// action creator
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadSpotDetails = (spotDetails) => ({
    type: LOAD_SPOT_DETAILS,
    spotDetails
})


// {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(spot)
// }

// thunk action creators
export const loadSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    console.log(response)

    if (response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return spots
    }

}

export const loadSpotDetailsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    console.log(response)

    if (response.ok) {
        const spotDetails = await response.json()
        dispatch(loadSpotDetails(spotDetails))
        return spotDetails
    }

}

// spots reducer
const spotsReducer = (state = {}, action) => {
    const allSpots = {};
    switch (action.type) {
        case LOAD_SPOTS:
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            });
            return allSpots
        case LOAD_SPOT_DETAILS:
            // console.log('this is the action!!!!,', action)
            return { ...state, 'spotDetails': action.spotDetails }
        default:
            return state
    }
}

export default spotsReducer
