import { useState } from 'react'
import { AiFillStar } from "react-icons/ai"

import { createReviewThunk } from '../../store/reviews'

import './CreateReviewModal.css'



function CreateReviewModal() {
    const [reviewText, setReviewText] = useState('')
    const [reviewStars, setReviewStars] = useState(0)
    const [activeReviewStars, setActiveReviewStars] = useState(0)

    function validReview() {
        if (reviewText.length < 10 || reviewStars === 0) {
            return true
        }
        return false
    }

    function submitReview() {
        const review = { review: reviewText, stars: reviewStars }
        // dispatchEvent(createReviewThunk(review))

    }

    return (
        <div id='review-modal-container'>
            <h2 id='review-header'>How was your stay?</h2>
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
                onClick={submitReview()}
            >
                Submit Your Review
            </button>
        </div >
    )
}

export default CreateReviewModal
