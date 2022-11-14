import React from 'react'
import {useSelector} from 'react-redux'
import {getUserPurchasedBooks} from '../../store/user'
import {getBooksByIds, getBooksLoadingStatus} from '../../store/books'
import Loader from '../common/loader'
import BookCard from './book/bookCard'

const UserBooksCard = () => {
    const isLoading = useSelector(getBooksLoadingStatus())
    const userBooksIds = useSelector(getUserPurchasedBooks())
    const userBooks = useSelector(getBooksByIds(userBooksIds))

    return !isLoading
        ? (
            <div className="card mb-3 mt-3">
                <div className="card-body">
                    <h5 className="text-center">Ваши книги</h5>
                    <div className="d-flex flex-wrap justify-content-between">
                        {userBooks.map(book => (
                            <BookCard book={book} key={book.id} isCatalogCard={false}/>
                        ))}
                    </div>
                </div>
            </div>
        )
        : <Loader target={'books'}/>
}

export default UserBooksCard
