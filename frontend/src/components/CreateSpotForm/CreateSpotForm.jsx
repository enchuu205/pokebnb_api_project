import { useEffect, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createSpotThunk, updateSpotThunk } from "../../store/spots"
import { addImageThunk, deleteImageThunk } from "../../store/images"
import { useParams } from "react-router-dom"

import { ManageContext } from "../../context/Manage"

import './CreateSpotForm.css'

export function CreateSpotForm() {
    const { spotId } = useParams()

    const { manage } = useContext(ManageContext)

    let spotDetailsObj = []
<<<<<<< HEAD
    spotDetailsObj = useSelector((state) => state.spots[spotId])
    if (manage) {
        console.log(spotDetailsObj)
=======
    let spotImagesNonPreview = []
    let previousImageArr = []
    let spotDetailsObjManage = useSelector((state) => state.spots[spotId])

    if (manage) {
        spotDetailsObj = spotDetailsObjManage
        // console.log(spotDetailsObj)
        spotImagesNonPreview = spotDetailsObj.SpotImages?.filter((image) => image.preview != true)
        // console.log(spotImagesNonPreview)
        previousImageArr = spotDetailsObj.SpotImages
        console.log(previousImageArr)
>>>>>>> reviews-route
    }

    const [country, setCountry] = useState(manage ? spotDetailsObj.country : '')
    const [streetAddress, setStreetAddress] = useState(manage ? spotDetailsObj.address : '')
    const [city, setCity] = useState(manage ? spotDetailsObj.city : '')
    const [state, setState] = useState(manage ? spotDetailsObj.state : '')
    const [latitude, setLatitude] = useState(manage ? spotDetailsObj.lat : '')
    const [longitude, setLongitude] = useState(manage ? spotDetailsObj.lng : '')
    const [description, setDescription] = useState(manage ? spotDetailsObj.description : '')
    const [title, setTitle] = useState(manage ? spotDetailsObj.name : '')
    const [price, setPrice] = useState(manage ? spotDetailsObj.price : '')
    const [previewImage, setPreviewImage] = useState(manage ? spotDetailsObj.previewImage : '')
    const [image2, setImage2] = useState(manage && spotImagesNonPreview?.length > 0 ? spotImagesNonPreview[0].url : '')
    const [image3, setImage3] = useState(manage && spotImagesNonPreview?.length > 1 ? spotImagesNonPreview[1].url : '')
    const [image4, setImage4] = useState(manage && spotImagesNonPreview?.length > 2 ? spotImagesNonPreview[2].url : '')
    const [image5, setImage5] = useState(manage && spotImagesNonPreview?.length > 3 ? spotImagesNonPreview[3].url : '')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const inputs = [country, streetAddress, city, state, latitude, longitude, description, title, price, previewImage, image2, image3, image4, image5]

    const [validationErrors, setValidationErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    // Gather all errors from form
    useEffect(() => {
        const errors = {}
        if (country.length === 0) errors.country = 'Country is required'
        if (streetAddress.length === 0) errors.streetAddress = 'Address is required'
        if (city.length === 0) errors.city = 'City is required'
        if (state.length === 0) errors.state = 'State is required'
        if (latitude.length === 0) errors.latitude = 'Latitude is required'
        if (longitude.length === 0) errors.longitude = 'Longitude is required'
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if (title.length === 0) errors.title = 'Name is required'
        if (price.length === 0) errors.price = 'Price is required'
        if (previewImage.length === 0) errors.previewImage = 'Preview image is required'
        if (previewImage != null && !errors.previewImage) {
            const end = previewImage.slice(previewImage.length - 4, previewImage.length)
            const jpeg_end = previewImage.slice(previewImage.length - 5, previewImage.length)
            if (end != '.png' && end != '.jpg' && jpeg_end != '.jpeg') errors.previewImageEnd = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (image2.length != 0) {
            const end = image2.slice(image2.length - 4, image2.length)
            const jpeg_end = image2.slice(image2.length - 5, image2.length)
            // console.log('end', end, 'jpeg_end', jpeg_end)
            if (end != '.png' && end != '.jpg' && jpeg_end != '.jpeg') errors.image2 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (image3.length != 0) {
            const end = image3.slice(image3.length - 4, image3.length)
            const jpeg_end = image3.slice(image3.length - 5, image3.length)
            if (end != '.png' && end != '.jpg' && jpeg_end != '.jpeg') errors.image3 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (image4.length != 0) {
            const end = image4.slice(image4.length - 4, image4.length)
            const jpeg_end = image4.slice(image4.length - 5, image4.length)
            if (end != '.png' && end != '.jpg' && jpeg_end != '.jpeg') errors.image4 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (image5.length != 0) {
            const end = image5.slice(image5.length - 4, image5.length)
            const jpeg_end = image5.slice(image5.length - 5, image5.length)
            if (end != '.png' && end != '.jpg' && jpeg_end != '.jpeg') errors.image5 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        setValidationErrors(errors)
        // console.log(errors)
    }, [...inputs])

    const submitSpotForm = (e) => {
        e.preventDefault();
        setSubmit(true)

        const spot = {
            // ...spot,
            address: streetAddress,
            city,
            state,
            country,
            lat: latitude,
            lng: longitude,
            name: title,
            description,
            price: Number(price)
        }

        let imagesArr = []
        previewImage ? imagesArr.push(previewImage) : null
        image2 ? imagesArr.push(image2) : null
        image3 ? imagesArr.push(image3) : null
        image4 ? imagesArr.push(image4) : null
        image5 ? imagesArr.push(image5) : null

        if (Object.keys(validationErrors).length === 0) {
            // dispatch the create spot form, and then add the images with the new spot object
            dispatch(createSpotThunk(spot))
                .then((spot) => {
                    dispatch(addImageThunk(spot.id, imagesArr))
                    return spot
                })
                .then((spot) => navigate(`/spots/${spot.id}`))



        }
    }

<<<<<<< HEAD
    const updateSpotForm = () => {
=======
    function updateSpotReload() {
        navigate(`/spots/${spotDetailsObj.id}`)
        window.location.reload()
    }

    const updateSpotForm = (e) => {

        e.preventDefault();
        setSubmit(true)

        // console.log(spotDetailsObj)

>>>>>>> reviews-route
        const spot = {
            // ...spot,
            id: spotDetailsObj.id,
            address: streetAddress,
            city,
            state,
            country,
            lat: Number(latitude),
            lng: Number(longitude),
            name: title,
            description,
            price: Number(price)
        }
        // console.log('this is the spot', spot)

        let imagesArr = []
        previewImage ? imagesArr.push(previewImage) : null
        image2 ? imagesArr.push(image2) : null
        image3 ? imagesArr.push(image3) : null
        image4 ? imagesArr.push(image4) : null
        image5 ? imagesArr.push(image5) : null

        // console.log(imagesArr, 'images array')

        if (Object.keys(validationErrors).length === 0) {
            // dispatch the create spot form, and then add the images with the new spot object
            dispatch(updateSpotThunk(spot))
                .then((spot) => {
                    dispatch(deleteImageThunk(previousImageArr))
                    return spot
                })
                .then((spot) => {
                    // console.log('thunk return', spot)
                    dispatch(addImageThunk(spotDetailsObj.id, imagesArr))
                    return spot
                })
                .then(() => updateSpotReload())



        }
    }

    function createExampleSpot() {
        setCountry('Unova')
        setStreetAddress('278 Shuckle Way')
        setCity('Black City')
        setState('Gen 5')
        setLatitude(11.11111)
        setLongitude(-11.11111)
        setDescription('Luxurious modern home located near the Pokemon Center with sleek interior stainless steel design.')
        setTitle('Steel Haven Retreat: Luxe Modern Oasis')
        setPrice(600)
        setPreviewImage('https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925132/black-city/f9ebd9f492ykd1jtovde.png')
        setImage2('https://res.cloudinary.com/dztk9g8ji/image/upload/v1714291259/black-city/c5f1da94-c16b-4d09-a4d6-956dae059715.png')
        setImage3('https://res.cloudinary.com/dztk9g8ji/image/upload/v1710925132/black-city/opthemblnwrq5u2gmrrk.png')
    }

    return (
        <div className="create-spot-form-container">
            <h1>{manage ? 'Update your' : 'Create a new'} Spot</h1>
            <label>Where&apos;s your place located?</label>
            <div>Guests will only get your exact address once they booked a reservation.</div>
            <div className="location-container">
                <span>Country </span>
                {submit && validationErrors.country && <span className="validation-text">{validationErrors.country}</span>}
                <input
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    placeholder="Country"
                />
                <span>Street Address </span>
                {submit && validationErrors.streetAddress && <span className="validation-text">{validationErrors.streetAddress}</span>}
                <input
                    type='text'
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                    placeholder="Address"
                />
                <div id='city-state-container'>
                    <div>
                        <span>City </span>
                        {submit && validationErrors.city && <span className="validation-text">{validationErrors.city}</span>}
                        <input
                            id='city'
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder="City"
                        />
                        <span>{'  ,'}</span>
                    </div>
                    <div>
                        <span>State </span>
                        {submit && validationErrors.state && <span className="validation-text">{validationErrors.state}</span>}
                        <input
                            id='state'
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            placeholder="STATE"
                        />
                    </div>
                </div>
                <div id="lat-long-container">
                    <div>
                        <span>Latitude </span>
                        {submit && validationErrors.latitude && <span className="validation-text">{validationErrors.latitude}</span>}
                        <input
                            id='latitude'
                            type='text'
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="Latitude"
                        />
                        <span>{'  ,'}</span>
                    </div>
                    <div>
                        <span>Longitude </span>
                        {submit && validationErrors.longitude && <span className="validation-text">{validationErrors.longitude}</span>}
                        <input
                            id='longitude'
                            type='text'
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            placeholder="Longitude"
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div className="description-container">
                <label>Describe your place to guests</label>
                <div>Mention the best features of your space, any special amenties like fast wifi or parking, and what you love about the neighborhood.</div>
                <textarea
                    type='text'
                    id='description-text-box'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Please write at least 30 characters"
                />
                {submit && validationErrors.description && <span className="validation-text">{validationErrors.description}</span>}
            </div>
            <hr />
            <div className="title-container">
                <label>Create a title for your spot</label>
                <div>Catch guests&apos; attention with a spot title that highlights what makes your place special.</div>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Name of your spot"
                />
                {submit && validationErrors.title && <span className="validation-text">{validationErrors.title}</span>}
            </div>
            <hr />
            <div id="price-container">
                <label>Set a base price for your spot</label>
                <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
                $<input
                    id="price-input"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="Price per night (USD)"
                />
                {submit && validationErrors.price && <span className="validation-text">{validationErrors.price}</span>}
            </div>
            <hr />
            <div className="photo-container">
                <label>Liven up your spot with photos</label>
                <div>Submit a link to at least one photo to publish your spot</div>
                <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    required
                    placeholder="Preview Image URL"
                />
                {submit && validationErrors.previewImage && <span className="validation-text">{validationErrors.previewImage}</span>}
                {submit && validationErrors.previewImageEnd && <div className="validation-text">{validationErrors.previewImageEnd}</div>}
                <input
                    type="text"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    required
                    placeholder="Image URL"
                />
                {submit && validationErrors.image2 && <span className="validation-text">{validationErrors.image2}</span>}
                <input
                    type="text"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    required
                    placeholder="Image URL"
                />
                {submit && validationErrors.image3 && <span className="validation-text">{validationErrors.image3}</span>}
                <input
                    type="text"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    required
                    placeholder="Image URL"
                />
                {submit && validationErrors.image4 && <span className="validation-text">{validationErrors.image4}</span>}
                <input
                    type="text"
                    value={image5}
                    onChange={(e) => setImage5(e.target.value)}
                    required
                    placeholder="Image URL"
                />
                {submit && validationErrors.image5 && <span className="validation-text">{validationErrors.image5}</span>}
            </div>
            <hr />
            <button
                className="create-spot-button"
                onClick={manage ? updateSpotForm : submitSpotForm}
            >{manage ? 'Update' : 'Create'} Spot</button>
            <button className="create-spot-button" onClick={(e) => createExampleSpot(e)}>Example Spot</button>
        </div>

    )

}

export default CreateSpotForm
