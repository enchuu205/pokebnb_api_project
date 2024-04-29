import { useParams } from 'react-router-dom'
import { loadReviewsThunk } from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import { AiFillStar } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom'

import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import CreateReviewModal from '../CreateReviewModal'
import DeleteReviewModal from '../DeleteReviewModal';

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

    console.log('currentUser', currentUser)

    const reviewsObj = useSelector((state) => state?.reviews)
    let reviews = Object.values(reviewsObj)

    // console.log('reviewfinder', reviews.find((review) => review.User.id === currentUser?.id))

    // console.log('reviews obj:', reviewsObj)
    // console.log('reviews', reviews)

    const reviewsCreator = reviews?.reverse().map((review, index) => {
        // console.log(review)
        return (
            <div key={index} className='review-container'>
                <div className='review-name'>{review?.User?.firstName}</div>
                <div className='review-date'>{reviewDateFormatter(review.createdAt)}</div>
                {review.review}
                {currentUser?.id === review.userId &&
                    <div>
                        <button className='delete-review-button'>
                            <OpenModalMenuItem
                                itemText='Delete Review'
                                modalComponent={<DeleteReviewModal reviewId={review.id} />}
                            />
                        </button>
                    </div>
                }
            </div>
        )
    })

    // function createdReview() {
    //     let createdReview = reviews.find((review) => review.User.id === currentUser.id)
    //     created
    // }
    let currentUserReviews = {}
    function noReviewFromCurrentUser() {
        if (reviews.length > 0) {
            currentUserReviews = (reviews.find((review) => review.userId === currentUser?.id))
            if (currentUserReviews) return false
        }
        return true
        // console.log('currentUserReviews', currentUserReviews)
        // currentUserReviews.length > 0 ? false : true
    }

    useEffect(() => {
        dispatch(loadReviewsThunk(spotId))
    }, [dispatch, spotId])

    if (!reviewsObj) return null

    return (
        <>
            <div className="reviews-overall"><AiFillStar /> {spotDetailsObj.avgStarRating && Number(spotDetailsObj.avgStarRating).toFixed(1) + ` · ` + spotDetailsObj.numReviews + ` review${spotDetailsObj.numReviews > 1 ? 's' : ''}` || 'New'}</div>
            {currentUser && currentUser.id != spotDetailsObj.Owner.id && reviews.length < 1 && <div>Be the first to post a review!</div>}
            {currentUser && currentUser?.id != spotDetailsObj.Owner.id && noReviewFromCurrentUser() &&
                < button className='post-review-button'>
                    <OpenModalMenuItem
                        itemText='Post your Review'
                        modalComponent={<CreateReviewModal />}
                    />
                </button >
            }
            <div>{reviewsCreator}</div>
        </>
    )
}

export default Reviews
