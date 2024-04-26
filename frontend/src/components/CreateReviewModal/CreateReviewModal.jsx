import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillStar } from "react-icons/ai"

import { createReviewThunk, loadReviewsThunk } from '../../store/reviews'
import { useModal } from '../../context/Modal'

import './CreateReviewModal.css'



function CreateReviewModal() {
    const [reviewText, setReviewText] = useState('')
    const [reviewStars, setReviewStars] = useState(0)
    const [activeReviewStars, setActiveReviewStars] = useState(0)
    // const [errors, setErrors] = useState({})

    const { closeModal } = useModal()

    const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const currentUser = useSelector((state) => state.session.user)
    const spotDetailsObj = useSelector((state) => state.spots.spotDetails)
    // console.log(currentUser, spotDetailsObj)

    function validReview() {
        if (reviewText.length < 10 || reviewStars === 0) {
            return true
        }
        return false
    }

    function submitReview(spotId) {
        const review = { review: reviewText, stars: reviewStars }
        console.log(review, spotId)
        dispatch(createReviewThunk(review, spotId))
            .then(() => dispatch(loadReviewsThunk(spotId)))
            .then(closeModal)
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data?.errors) {
        //         setErrors(data.errors);
        //     }
        // });
    }

    return (
        <div id='review-modal-container'>
            <h2 id='review-header'>How was your stay?</h2>
            {/* {errors && console.log(errors)} */}
            <textarea
                id='review-text-area'
                placeholder="Leave your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div id='review-stars'>
                <div
                    className={activeReviewStars < 1 ? 'empty' : 'filled'}
                    onMouseEnter={() => setActiveReviewStars(1)}
                    onMouseLeave={() => setActiveReviewStars(reviewStars)}
                    onClick={() => setReviewStars(1)}
                >
                    <AiFillStar className='review-stars' />
                </div>
                <div className={activeReviewStars < 2 ? 'empty' : 'filled'}
                    onMouseEnter={() => setActiveReviewStars(2)}
                    onMouseLeave={() => setActiveReviewStars(reviewStars)}
                    onClick={() => setReviewStars(2)}
                >
                    <AiFillStar className='review-stars' />
                </div>
                <div className={activeReviewStars < 3 ? 'empty' : 'filled'}
                    onMouseEnter={() => setActiveReviewStars(3)}
                    onMouseLeave={() => setActiveReviewStars(reviewStars)}
                    onClick={() => setReviewStars(3)}
                >
                    <AiFillStar className='review-stars' />
                </div>
                <div className={activeReviewStars < 4 ? 'empty' : 'filled'}
                    onMouseEnter={() => setActiveReviewStars(4)}
                    onMouseLeave={() => setActiveReviewStars(reviewStars)}
                    onClick={() => setReviewStars(4)}
                >
                    <AiFillStar className='review-stars' />
                </div>
                <div className={activeReviewStars < 5 ? 'empty' : 'filled'}
                    onMouseEnter={() => setActiveReviewStars(5)}
                    onMouseLeave={() => setActiveReviewStars(reviewStars)}
                    onClick={() => setReviewStars(5)}
                >

                    <AiFillStar className='review-stars' />
                </div>
                Stars
            </div>
            <button
                id='review-submit-button'
                disabled={validReview()} className={`${validReview() ? 'disable' : ''}`}
                onClick={() => submitReview(spotDetailsObj.id)}
            >
                Submit Your Review
            </button>
        </div >
    )
}

export default CreateReviewModal
