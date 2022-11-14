import React from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getUserPurchasedBooks} from '../../store/user'
import {getBookById, getBooksLoadingStatus} from '../../store/books'
import Loader from '../common/loader'

const Reader = () => {
    const {bookId} = useParams()
    const userBooks = useSelector(getUserPurchasedBooks())
    const isLoading = useSelector(getBooksLoadingStatus())
    const isReadingAvailable = userBooks.includes(bookId)
    const {name, author} = useSelector(getBookById(bookId))

    return !isLoading
        ? (
            isReadingAvailable
                ? (
                    <div className="container text-center mt-3">
                        <div className="alert alert-success" role="alert">
                            {`Здесь должно быть содержимое книги "${name}", автора: ${author}`}
                        </div>
                    </div>

                )
                : <Redirect to="/all_books"/>
        )
        : <Loader target={'reader'}/>
}

export default Reader
