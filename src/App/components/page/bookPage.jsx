import React from 'react'
import {useParams} from 'react-router-dom'
import BookImgComponent from '../ui/book/bookImgComponent'
import BookRating from '../ui/book/bookRating'
import BookInfoMainContent from '../ui/book/bookInfoMainContent'
import Loader from '../common/loader'
import {useDispatch, useSelector} from 'react-redux'
import {getBookById} from '../../store/books'
import {addItemToCart, getRatedBooks, getUserCart, getUserId, getUserPurchasedBooks} from '../../store/user'
import AddToCartButton from '../ui/addToCartButton'
import RateBook from '../ui/rateBook'

const BookPage = () => {
    const dispatch = useDispatch()
    const userId = useSelector(getUserId())
    const params = useParams()
    const {bookId} = params
    const book = useSelector(getBookById(bookId))
    const isUserHasBook = useSelector(getUserPurchasedBooks()).includes(bookId)
    const isBookInUserCart = useSelector(getUserCart()).includes(bookId)
    const purchasedBooks = useSelector(getUserPurchasedBooks())
    const ratedBooks = useSelector(getRatedBooks())

    const handleAddToCartClick = () => {
        dispatch(addItemToCart({userId, items: [bookId]}))
    }

    return book && book.genre
        ? (
            <div className="container mt-3">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <BookImgComponent url={book.imgUrl} />
                        <BookRating rating={book.ratings}/>
                        {purchasedBooks.includes(bookId) && !ratedBooks.includes(bookId) && <RateBook />}
                    </div>
                    <div className="col-md-8 d-flex flex-column align-items-end">
                        <BookInfoMainContent {...book}/>
                        <AddToCartButton className="btn btn-success" isUserHasBook={isUserHasBook} isBookInUserCart={isBookInUserCart} price={book.price} onClick={handleAddToCartClick}/>
                    </div>
                </div>
            </div>
        )
        : <Loader target={'book'} margin={5} />
}

export default BookPage
