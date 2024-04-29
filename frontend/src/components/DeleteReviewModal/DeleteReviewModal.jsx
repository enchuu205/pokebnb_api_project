import { deleteReviewThunk } from "../../store/reviews"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"

import './DeleteReviewModal.css'

function DeleteReviewModal({ reviewId }) {

    const { closeModal } = useModal()
    const dispatch = useDispatch()

    function deleteReview() {
        dispatch(deleteReviewThunk(reviewId))
            .then(closeModal)
        // .then(window.location.reload())
    }

    return (
        <div className="delete-confirmation-container">
            <h2>Confirm Delete</h2>
            <div className="confirmation-text">Are you sure you want to remove this review?</div>
            <button id='delete-button' onClick={() => deleteReview()}>{'Yes (Delete Review)'}</button>
            <button id='keep-button' onClick={() => closeModal()}>{'No (Keep Review)'}</button>
        </div>
    )
}

export default DeleteReviewModal
