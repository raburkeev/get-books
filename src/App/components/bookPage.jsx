import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import api from '../../api'
import BookImgComponent from './bookImgComponent'
import BookRating from './bookRating'
import BookInfoMainContent from './bookInfoMainContent'

const BookPage = () => {
    const params = useParams()
    const {bookId} = params
    const [book, setBook] = useState(null)
    useEffect(() => {
        api.books.getById(+bookId).then(data => setBook(data))
    }, [])

    return book && book.genre
        ? (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <BookImgComponent url={book.imgUrl} />
                        <BookRating rating={book.ratings}/>
                    </div>
                    <div className="col-md-8">
                        <BookInfoMainContent {...book}/>
                    </div>
                </div>
            </div>
        )
        : <h1>Loading...</h1>
}

export default BookPage
