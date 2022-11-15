/*eslint-disable*/
import React from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import useMockData from '../utils/mockData'
import {useSelector} from 'react-redux'
import {getIsAdmin} from '../store/user'
import EditBooksList from '../components/ui/editBooksList'

const AdminPanel = () => {
    const isAdmin = useSelector(getIsAdmin())
    const {type} = useParams()

    const {initialize} = useMockData()

    const handleClick = () => {
        initialize()
    }

    const listItems = [
        {id: 0, label: 'Перейти к инициализации первоначальных данных', path: 'initialize'},
        {id: 1, label: 'Перейти к редактированию списка книг', path: 'editBooksList'}
    ]

    if (!isAdmin) {
        return <Redirect to="/all_books"/>
    }

    return (
        <div className="container mt-3">
            <div className="col-10">
                <div className="card shadow">
                    <div className="card-body">
                        <h1 className="text-center">AdminPanel Page</h1>
                        <ul>
                            {listItems.map(item => (
                                <li key={item.id} className="list-group-item">
                                    <Link to={`/admin/${item.path}`}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {type === 'initialize' && (
                            <div className="alert alert-warning" role="alert">
                                <p>Если вы хотите проинициализировать исходные данные в FireBase нажмите красную кнопку</p>
                                <button className="btn btn-danger" onClick={handleClick}>Начать инициализацию</button>
                            </div>
                        )}
                        {type === 'editBooksList' && <EditBooksList />}
                    </div>
                </div>
            </div>
        </div>
    )
}
// <button className="btn btn-primary" onClick={handleClick}>Инициализировать данные в FireBase</button>

export default AdminPanel
