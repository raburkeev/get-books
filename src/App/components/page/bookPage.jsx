import React from 'react'
import {useParams, useHistory} from 'react-router-dom'
import BookImgComponent from '../ui/book/bookImgComponent'
import BookRating from '../ui/book/bookRating'
import BookInfoMainContent from '../ui/book/bookInfoMainContent'
import Loader from '../common/loader'
import {useDispatch, useSelector} from 'react-redux'
import {getBookById} from '../../store/books'
import {addItemToCart, getUserCart, getUserId} from '../../store/user'

const BookPage = () => {
    const dispatch = useDispatch()
    const userId = useSelector(getUserId())
    const history = useHistory()
    const params = useParams()
    const {bookId} = params
    const book = useSelector(getBookById(bookId))
    const userCart = useSelector(getUserCart())

    const handleAddToCartClick = () => {
        dispatch(addItemToCart({userId, userCart: [...userCart, bookId]}))
    }

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
                        <button className="btn btn-primary me-1" onClick={() => history.push(`/all_books/${bookId}/edit`)}>Edit</button>
                        <button className="btn btn-success" onClick={handleAddToCartClick}>Добвавить в корзину</button>
                    </div>
                </div>
            </div>
        )
        : <Loader target={'book'} margin={5} />
}

export default BookPage
