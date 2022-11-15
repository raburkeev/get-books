import React from 'react'
import {Redirect} from 'react-router-dom'
import useMockData from '../utils/mockData'
import {useSelector} from 'react-redux'
import {getIsAdmin} from '../store/user'

const AdminPanel = () => {
    const isAdmin = useSelector(getIsAdmin())

    const {initialize} = useMockData()

    const handleClick = () => {
        initialize()
    }

    if (!isAdmin) {
        return <Redirect to="/all_books"/>
    }

    return (
        <div className="container mt-5">
            <h1>AdminPanel Page</h1>
            <button className="btn btn-primary" onClick={handleClick}>Инициализировать данные в FireBase</button>
        </div>
    )
}

export default AdminPanel
