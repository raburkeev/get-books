import React from 'react'
import useMockData from '../utils/mockData'

const Main = () => {
    const {initialize} = useMockData()

    const handleClick = () => {
        initialize()
    }

    return (
        <div className="container mt-5">
            <h1>Main Page</h1>
            <button className="btn btn-primary" onClick={handleClick}>Инициализировать данные в FireBase</button>
        </div>
    )
}

export default Main
