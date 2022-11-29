import React from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getRatedBooks, getUserPurchasedBooks} from '../../store/user'
import {getBookById, getBooksLoadingStatus} from '../../store/books'
import Loader from '../common/loader'

const Reader = () => {
    const {bookId} = useParams()
    const userBooks = useSelector(getUserPurchasedBooks())
    const isLoading = useSelector(getBooksLoadingStatus())
    const isReadingAvailable = userBooks.includes(bookId)
    const {name, author} = useSelector(getBookById(bookId))
    const ratedBooks = useSelector(getRatedBooks())

    return !isLoading
        ? (
            isReadingAvailable
                ? (
                    <>
                        <div className="container text-center mt-3 fs-3">
                            <div className="alert alert-success" role="alert">
                                {`Здесь должно быть содержимое книги "${name}", автора: ${author}`}
                            </div>
                            {!ratedBooks.includes(bookId) && (
                                <div className="alert alert-primary" role="alert">
                                    Пожалуйста, не забудьте поставить оценку данному произведению на
                                    <span className="fs-3 fst-italic"><Link to={`/all_books/${bookId}`}> страничке книги </Link></span>
                                </div>
                            )}
                        </div>
                    </>
                )
                : <Redirect to="/all_books"/>
        )
        : <Loader target={'reader'}/>
}

export default Reader
