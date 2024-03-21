import { useParams } from "react-router-dom"

function SpotDetails() {
    let { spotId } = useParams()
    return (
        <>
            <div>this is the spot id from the website path: {spotId}</div>

        </>
    )
}

export default SpotDetails
