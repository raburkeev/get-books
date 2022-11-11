import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getIsLoggedIn, getUserCart} from '../../store/user'
import NavProfile from './navProfile'

const NavBar = () => {
    const history = useHistory()
    const isLoggedIn = useSelector(getIsLoggedIn())
    const userCart = useSelector(getUserCart())

    const items = userCart.length - 1

    const handleCartBtnClick = () => {
        history.push('/cart')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <div className="collapse justify-content-between navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Main</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/all_books">All Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/123">123</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/321">321</Link>
                        </li>
                    </ul>
                    {isLoggedIn ? (
                        <div className="d-flex">
                            <button type="button" className="btn btn-primary position-relative mt-2 mx-4" onClick={handleCartBtnClick}>
                                <i className="bi bi-cart3"/>
                                {'   '}
                                Корзина
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {items}
                                    <span className="visually-hidden">items</span>
                                </span>
                            </button>
                            <NavProfile/>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button type="button" className="btn btn-success m-2">
                                Вход/Регистрация
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar
