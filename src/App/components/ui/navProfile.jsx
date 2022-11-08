import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getUser} from '../../store/user'
import Loader from '../common/loader'
import {Link} from 'react-router-dom'

const NavProfile = () => {
    const user = useSelector(getUser())
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState)
    }

    if (!user) {
        return <Loader target={'user'}/>
    }

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{user.name}</div>
                <img
                    src={user.img}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={`w-100 dropdown-menu text-center ${isOpen ? 'show' : ''}`}>
                <button className="btn btn-primary">Link to profile</button>
                <Link to={'/logout'} className="dropdown-item">Выйти</Link>
            </div>
        </div>
    )
}
// <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
// <Link to={'/logout'} className="dropdown-item">Logout</Link>

export default NavProfile
