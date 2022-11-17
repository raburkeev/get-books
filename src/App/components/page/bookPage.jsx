/*eslint-disable*/
import React, {useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import BookImgComponent from '../ui/book/bookImgComponent'
import BookRating from '../ui/book/bookRating'
import BookInfoMainContent from '../ui/book/bookInfoMainContent'
import Loader from '../common/loader'
import {useDispatch, useSelector} from 'react-redux'
import {getBookById} from '../../store/books'
import {addItemToCart, getRatedBooks, getUser, getUserCart, getUserId, getUserPurchasedBooks} from '../../store/user'
import AddToCartButton from '../ui/addToCartButton'
import RateBook from '../ui/rateBook'
import Modal from '../common/modal'

const BookPage = () => {
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const userId = useSelector(getUserId())
    const history = useHistory()
    const params = useParams()
    const {bookId} = params
    const book = useSelector(getBookById(bookId))
    const isUserHasBook = useSelector(getUserPurchasedBooks()).includes(bookId)
    const isBookInUserCart = useSelector(getUserCart()).includes(bookId)
    const purchasedBooks = useSelector(getUserPurchasedBooks())
    const ratedBooks = useSelector(getRatedBooks())
    const user = useSelector(getUser())

    const handleAddToCartClick = () => {
        if (user) {
            dispatch(addItemToCart({userId, items: [bookId]}))
        } else {
            setModal(true)
        }
    }

    const handleCloseClick = () => {
        setModal(prevState => !prevState)
    }

    const handleAcceptClick = () => {
        history.push('/login')
    }

    return book && book.genre
        ? (
            <div>
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
                {modal ? <Modal
                    modalTitle={'Внимание'}
                    desc={'Перед тем как добавить книгу в корзину, пожалуйста, войтите в систему или зарегистрируйтесь'}
                    buttonLabel={'Войти в систему / Зарегистрироваться'}
                    onCloseClick={handleCloseClick}
                    onAcceptClick={handleAcceptClick}
                /> : null}
            </div>

        )
        : <Loader target={'book'} margin={5} />
}

export default BookPage
