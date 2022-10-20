import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import api from '../../../api'
import BookImgComponent from '../ui/book/bookImgComponent'
import BookRating from '../ui/book/bookRating'
import BookInfoMainContent from '../ui/book/bookInfoMainContent'
import Loader from '../common/loader'

const BookPage = () => {
    const history = useHistory()
    const params = useParams()
    const {bookId} = params
    const [book, setBook] = useState(null)
    useEffect(() => {
        api.books.getById(+bookId).then(data => setBook(data))
    }, [])

    return book && book.genre
        ? (
            <div className="container mt-3">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <BookImgComponent url={book.imgUrl} />
                        <BookRating rating={book.ratings}/>
                    </div>
                    <div className="col-md-8">
                        <BookInfoMainContent {...book}/>
                        <button className="btn btn-primary" onClick={() => history.push(`/all_books/${bookId}/edit`)}>Edit</button>
                    </div>

                </div>
            </div>
        )
        : <Loader target={'book'} margin={5} />
}

export default BookPage
