import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getBooksByIds, getBooksLoadingStatus} from '../../store/books'
import Loader from '../common/loader'
import CartTable from '../ui/cartTable'
import {getUserCart, getUserId} from '../../store/user'
import {Link} from 'react-router-dom'
import {nanoid} from 'nanoid'
import {createOrder} from '../../store/orders'

const CartPage = () => {
    const dispatch = useDispatch()
    const isBooksLoading = useSelector(getBooksLoadingStatus())
    const userId = useSelector(getUserId())
    const userCart = useSelector(getUserCart())
    const booksFromCart = useSelector(getBooksByIds(userCart))
    const indexedBooksFromCart = booksFromCart.map((book, index) => ({...book, index: index + 1}))

    const handleClick = () => {
        dispatch(createOrder({
            id: nanoid(),
            userId,
            userCart: userCart.filter(el => el !== 'init')
        }))
        // dispatch(clearUserCart({userId}))
    }

    return !isBooksLoading
        ? (
            booksFromCart.length
                ? (
                    <div className="container mt-3">
                        <CartTable books={indexedBooksFromCart}/>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary w-25" onClick={handleClick}>Оплатить</button>
                        </div>
                    </div>
                )
                : (
                    <div className="container mt-3 alert alert-primary text-center" role="alert">
                        <h4>
                            Ваша корзона пуста! Пожалуйста перейдите в
                            <span className="fs-3 fst-italic"><Link to="/all_books"> каталог </Link></span>
                            и выберите интересующие вас книги.
                        </h4>
                    </div>
                )

        )
        : <Loader target={'cart'}/>
}

export default CartPage
