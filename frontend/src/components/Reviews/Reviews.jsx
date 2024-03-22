import { useParams } from 'react-router-dom'
import { loadReviewsThunk } from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import './Reviews.css'

function Reviews() {
    let { spotId } = useParams()
    const dispatch = useDispatch()
    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    console.log('reviews obj:', reviewsObj)

    const reviewsCreator = reviews.map((review, index) => {
        return (
            <div id={index}>{review.review}</div>
        )
    })

    if (!reviewsObj) return null

    useEffect(() => {
        dispatch(loadReviewsThunk(spotId))
    }, [dispatch, spotId])


    return (
        <div>{reviewsCreator}</div>
    )
}

export default Reviews
