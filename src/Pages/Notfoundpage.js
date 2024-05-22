//Notfoundpage.js
import { Link } from 'react-router-dom'

const Notfoundpage = () => {
    return (
        <div>
            <p>This page doesn't exist. Go to<Link to="/">homepage</Link></p>
        </div>
    )
}

export {Notfoundpage};