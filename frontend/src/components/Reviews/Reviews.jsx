import { useParams } from 'react-router-dom'
import { loadReviewsThunk } from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

import './Reviews.css'

function reviewDateFormatter(date) {
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    let monthNumber = Number(date.slice(5, 7)) - 1
    let yearNumber = date.slice(8, 10)
    return (`${monthArray[monthNumber]} 20${yearNumber}`)
}

function Reviews() {
    let { spotId } = useParams()
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    // console.log('reviews obj:', reviewsObj)

    const reviewsCreator = reviews.map((review, index) => {
        return (
            <div key={index} className='review-container'>
                <div className='review-name'>{review.User.firstName}</div>
                <div className='review-date'>{reviewDateFormatter(review.createdAt)}</div>
                {review.review}
            </div>
        )
    })

    useEffect(() => {
        dispatch(loadReviewsThunk(spotId))
    }, [dispatch, spotId])

    if (!reviewsObj) return null

    return (
        <>
            {<button>Post your Review</button>}
            <div>{reviewsCreator}</div>
        </>
    )
}

export default Reviews
