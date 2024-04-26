import { useParams } from 'react-router-dom'
import { loadReviewsThunk } from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import { AiFillStar } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom'

import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import CreateReviewModal from '../CreateReviewModal'

import './Reviews.css'

function reviewDateFormatter(date) {
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    let monthNumber = Number(date.slice(5, 7)) - 1
    let yearNumber = date.slice(8, 10)
    return (`${monthArray[monthNumber]} 20${yearNumber}`)
}

// function isCurrentUsersSpot(currentUser, spotDetailsObj) {
//     if (currentUser.id === spotDetailsObj.Owner.id) return 'hidden'
//     return 'visible'
// }

function Reviews() {
    let { spotId } = useParams()
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const currentUser = useSelector((state) => state.session.user)
    const spotDetailsObj = useSelector((state) => state.spots.spotDetails)

    // console.log(currentUser, spotDetailsObj)


    const reviewsObj = useSelector((state) => state?.reviews)
    const reviews = Object.values(reviewsObj)
    console.log('reviews obj:', reviewsObj)
    console.log('reviews', reviews)

    const reviewsCreator = reviews?.map((review, index) => {
        return (
            <div key={index} className='review-container'>
                <div className='review-name'>{review?.User?.firstName}</div>
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
            <div className="reviews-overall"><AiFillStar /> {spotDetailsObj.avgStarRating && Number(spotDetailsObj.avgStarRating).toFixed(1) + ` · ` + spotDetailsObj.numReviews + ` review${spotDetailsObj.numReviews > 1 ? 's' : ''}` || 'New'}</div>
            {currentUser && currentUser.id != spotDetailsObj.Owner.id &&
                <button >
                    <OpenModalMenuItem
                        itemText='Post your Review'
                        modalComponent={<CreateReviewModal />}
                    />
                </button>}
            <div>{reviewsCreator}</div>
        </>
    )
}

export default Reviews
