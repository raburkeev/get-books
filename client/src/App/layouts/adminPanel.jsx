import React from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import useMockData from '../hooks/useMockData'
import {useSelector} from 'react-redux'
import {getIsAdmin, getUserLoadingStatus} from '../store/user'
import EditBooksList from '../components/ui/editBooksList'
import Loader from '../components/common/loader'
import AddBookForm from '../components/ui/addBookForm'

const AdminPanel = () => {
    const isAdmin = useSelector(getIsAdmin())
    const {type} = useParams()
    const isLoading = useSelector(getUserLoadingStatus())

    const {initialize} = useMockData()

    const handleClick = () => {
        initialize()
    }

    const listItems = [
        {id: 0, label: 'Перейти к инициализации первоначальных данных', path: 'initialize'},
        {id: 1, label: 'Перейти к редактированию списка книг', path: 'editBooksList'},
        {id: 2, label: 'Перейти к форме добавления новой книги', path: 'add_book'}
    ]

    return !isLoading
        ? (
            isAdmin
                ? (
                    <div className="container mt-3">
                        <div className="col-10">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h1 className="text-center">Панель администратора</h1>
                                    <ul>
                                        {listItems.map(item => (
                                            <li key={item.id} className="list-group-item">
                                                <Link to={`/admin/${item.path}`}>
                                                    <h5>
                                                        {item.label}
                                                    </h5>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    {type === 'initialize' && (
                                        <div className="alert alert-warning" role="alert">
                                            <p>Если вы хотите проинициализировать исходные данные в FireBase нажмите красную кнопку</p>
                                            <button className="btn btn-danger" onClick={handleClick}>Начать инициализацию</button>
                                            <h1>Нажимать только с умом!</h1>
                                        </div>
                                    )}
                                    {type === 'editBooksList' && <EditBooksList />}
                                    {type === 'add_book' && <AddBookForm/>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                : <Redirect to="/all_books"/>
        )
        : <Loader target={'admin panel'}/>
}

export default AdminPanel
