import { useState } from "react"
import './CreateSpotForm.css'

export function CreateSpotForm() {
    const [country, setCountry] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [image5, setImage5] = useState('')

    const submitSpotForm = (e) => {
        e.preventDefault();
        console.log('you pressed the submit button')
    }

    return (
        <div className="create-spot-form-container">
            <h1>Create a new Spot</h1>
            <label>Where&apos;s your place located?</label>
            <div>Guests will only get your exact address once they booked a reservation.</div>
            <div className="location-container">
                <div>Country</div>
                <input
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    placeholder="Country"
                />
                <div>Street Address</div>
                <input
                    type='text'
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                    placeholder="Address"
                />
                <div>City</div>
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="City"
                />
                <div>State</div>
                <input
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    placeholder="STATE"
                />
                <div id="lat-long-container">
                    <div>
                        <div>Latitude</div>
                        <input
                            id='latitude'
                            type='text'
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="Latitude"
                        />
                    </div>
                    <div>
                        <div>Longitude</div>
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
            </div>
            <hr />
            <div id="price-container">
                <label>Set a base price for your spot</label>
                <div>Competitive Pricing can help your listing stand out and rank higher in search results.</div>
                $<input
                    id="price-input"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="Price per night (USD)"
                />
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
                <input
                    type="text"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    required
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    required
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    required
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    value={image5}
                    onChange={(e) => setImage5(e.target.value)}
                    required
                    placeholder="Image URL"
                />
            </div>
            <hr />
            <button
                className="create-spot-button"
                onClick={submitSpotForm}
            >Create Spot</button>
        </div>
    )

}

export default CreateSpotForm
