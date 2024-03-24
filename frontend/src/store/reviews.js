import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = '/spots/:spotId/LOAD_REVIEWS'

// action creator
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})


// thunk action creators
export const loadReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    console.log('reviews response', response)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(loadReviews(reviews))
        return reviews
    }
}

// reviews reducer
const reviewsReducer = (state = {}, action) => {
    const allReviews = {}
    switch (action.type) {
        case LOAD_REVIEWS:
            action.reviews.Reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return allReviews
        default:
            return state

    }
}

export default reviewsReducer
