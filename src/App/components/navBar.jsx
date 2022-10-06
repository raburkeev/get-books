import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
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
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <Link to="/login">
                        <button type="button" className="btn btn-success m-2">
                            Вход/Регистрация
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
