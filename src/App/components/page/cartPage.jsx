import React from 'react'
import {useSelector} from 'react-redux'
import {getUserCart} from '../../store/user'
import {getBooksByIds, getBooksLoadingStatus} from '../../store/books'
import Loader from '../common/loader'
import CartTable from '../ui/cartTable'

const CartPage = () => {
    const isBooksLoading = useSelector(getBooksLoadingStatus())

    return !isBooksLoading
        ? (
            <div className="container mt-3">
                <CartTable/>
            </div>
        )
        : <Loader target={'cart'}/>
}

export default CartPage
