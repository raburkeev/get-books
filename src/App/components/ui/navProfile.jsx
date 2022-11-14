import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getUser, getUserCart} from '../../store/user'
import Loader from '../common/loader'
import {Link, useHistory} from 'react-router-dom'

const NavProfile = () => {
    const history = useHistory()
    const user = useSelector(getUser())
    const [isOpen, setIsOpen] = useState(false)
    const userCart = useSelector(getUserCart())

    const items = userCart.length - 1

    const handleCartBtnClick = () => {
        history.push('/cart')
    }

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState)
    }

    if (!user) {
        return <Loader target={'user'}/>
    }

    return (
        <>
            <button type="button" className="btn btn-primary position-relative mt-2 mx-4" onClick={handleCartBtnClick}>
                <i className="bi bi-cart3"/>
                {'   '}
                Корзина
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {items}
                    <span className="visually-hidden">items</span>
                </span>
            </button>
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
                    <Link to={`/user/${user.id}`} className="dropdown-item">Профиль</Link>
                    <Link to={'/logout'} className="dropdown-item">Выйти</Link>
                </div>
            </div>
        </>

    )
}
// <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
// <Link to={'/logout'} className="dropdown-item">Logout</Link>

export default NavProfile
