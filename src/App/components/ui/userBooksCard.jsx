import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getUserPurchasedBooks} from '../../store/user'
import {getBooksByIds, getBooksLoadingStatus} from '../../store/books'
import Loader from '../common/loader'
import BookCard from './book/bookCard'
import {Link} from 'react-router-dom'

const UserBooksCard = () => {
    const isLoading = useSelector(getBooksLoadingStatus())
    const userBooksIds = useSelector(getUserPurchasedBooks())
    const userBooks = useSelector(getBooksByIds(userBooksIds))
    const [search, setSearch] = useState('')
    const searchedBooks = userBooks.filter(book => book.name.toLowerCase().includes(search.toLowerCase()))
    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return !isLoading
        ? (
            <div className="card mb-3 mt-3">
                <div className="card-body">
                    {userBooks.length
                        ? (
                            <>
                                <h5 className="text-center">Ваши книги</h5>
                                <input className="form-control m-2" type="search" placeholder="Поиск..." aria-label="Search" onChange={handleChange}/>
                                <div className="d-flex flex-wrap justify-content-between">
                                    {searchedBooks.map(book => (
                                        <BookCard book={book} key={book.id} isCatalogCard={false}/>
                                    ))}
                                </div>
                            </>
                        )
                        : <h5 className="text-center">Вы пока не преобрели ни одну книгу. Можете сделать это на странице <Link to="/all_books">каталога</Link>.</h5>
                    }
                </div>
            </div>
        )
        : <Loader target={'books'}/>
}

export default UserBooksCard
