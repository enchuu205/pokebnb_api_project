import { deleteSpotThunk } from "../../store/spots"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { useContext } from "react"

import { ManageContext } from "../../context/Manage"

import './DeleteSpotModal.css'

function DeleteSpotModal({ spot }) {

    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const { setManage } = useContext(ManageContext)

    // console.log(spot)

    function deleteSpot() {
        dispatch(deleteSpotThunk(spot.id))
            .then(closeModal)
            .then(setManage(true))
    }

    return (
        <div className="delete-confirmation-container">
            <h2>Confirm Delete</h2>
            <div className="confirmation-text">Are you sure you want to remove this spot from the listings?</div>
            <button id='delete-button' onClick={() => deleteSpot()}>{'Yes (Delete Spot)'}</button>
            <button id='keep-button' onClick={() => closeModal()}>{'No (Keep Spot)'}</button>
        </div>
    )
}

export default DeleteSpotModal
