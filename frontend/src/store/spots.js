import { csrfFetch } from "./csrf";

const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const LOAD_SPOT_DETAILS = '/spots/LOAD_SPOT_DETAILS'
const CREATE_SPOT = '/spots/CREATE_SPOT'
const UPDATE_SPOT = '/spots/UPDATE_SPOT'

// action creator
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadSpotDetails = (spotDetails) => ({
    type: LOAD_SPOT_DETAILS,
    spotDetails
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

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

export const createSpotThunk = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        }
    )

    if (response.ok) {
        const spot = await response.json()
        dispatch(createSpot(spot))
        return spot
    }

}

export const updateSpotThunk = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        }
    )

    if (response.ok) {
        const spot = await response.json()
        dispatch(updateSpot(spot))
        return spot
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
        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        default:
            return state
    }
}

export default spotsReducer
