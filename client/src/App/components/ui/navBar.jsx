import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getIsAdmin, getIsLoggedIn} from '../../store/user'
import NavProfile from './navProfile'

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const isUserAdmin = useSelector(getIsAdmin())

    const location = useLocation()

    const navItems = isUserAdmin
        ? [
            {path: '/admin', label: 'Панель администратора'},
            {path: '/all_books', label: 'Каталог книг'}
        ]
        : [
            {path: '/all_books', label: 'Каталог книг'},
            {path: '/info', label: 'Доп. информация'}
        ]

    const getStylesForNavItem = (path) => {
        return `nav-link ${location.pathname.includes(path) ? ' active' : ''}`
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <div className="collapse justify-content-between navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {navItems.map(item => (
                            <li className="nav-item" key={item.path}>
                                <h5>
                                    <Link to={item.path} className={getStylesForNavItem(item.path)} >{item.label}</Link>
                                </h5>
                            </li>
                        ))}
                    </ul>
                    {isLoggedIn ? (
                        <div className="d-flex">

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
