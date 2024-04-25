import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = '/spots/:spotId/LOAD_REVIEWS'
const CREATE_REVIEW = '/spots/:spotId/CREATE_REVIEW'

// action creator
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
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

export const createReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const review = await response.json()
        dispatch(createReview(review))
        return review
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
        case CREATE_REVIEW:
            // action.reviews.Reviews
            return null
        default:
            return state

    }
}

export default reviewsReducer
