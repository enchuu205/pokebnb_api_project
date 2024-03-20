import { csrfFetch } from "./csrf";

const LOAD_SPOTS = '/spots/LOAD_SPOTS'

// action creator
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

// thunk action creator
export const loadSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    // {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(spot)
    // }
    console.log(response)

    if (response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return spots
    }

}

// spots reducer
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            });
            return allSpots
        default:
            return state
    }
}

export default spotsReducer
