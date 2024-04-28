import { csrfFetch } from "./csrf";

const ADD_IMAGE = '/spots/ADD_IMAGE'
const DELETE_IMAGE = '/spots/DELETE_IMAGE'

export const addImage = (images) => ({
    type: ADD_IMAGE,
    images
})

export const deleteImage = (message) => ({
    type: DELETE_IMAGE,
    message
})

export const addImageThunk = (spotId, images) => async (dispatch) => {
    let imageArr = []
    for (let i = 0; i < images.length; i++) {

        const body = {
            url: images[i],
            preview: i === 0
        }

        const response = await csrfFetch(`/api/spots/${spotId}/images`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }
        )

        if (response.ok) {
            const image = await response.json()
            dispatch(addImage(image))
            imageArr.push(image)
        }
    }
    return imageArr
}

export const deleteImageThunk = (previousImageArr) => async (dispatch) => {
    let message = {}
    for (let i = 0; i < previousImageArr.length; i++) {
        const response = await csrfFetch(`/api/spot-images/${previousImageArr[i].id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        )
        if (response.ok) {
            const messageRepeating = await response.json()
            dispatch(deleteImage(message))
            message = messageRepeating.message
        }
    }
    return message

}

// images reducer
const imagesReducer = (state = {}, action) => {

    switch (action.type) {
        case ADD_IMAGE:
            return { ...state, imageArr: action.imageArr }
        case DELETE_IMAGE:
            return { ...state, message: action.message }
        default:
            return state
    }
}

export default imagesReducer
