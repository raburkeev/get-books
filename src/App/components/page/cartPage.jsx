import React from 'react'
import {useSelector} from 'react-redux'
import {getBooksLoadingStatus} from '../../store/books'
import Loader from '../common/loader'
import CartTable from '../ui/cartTable'
import {toast} from 'react-toastify'

const CartPage = () => {
    const isBooksLoading = useSelector(getBooksLoadingStatus())

    const handleClick = () => {
        toast.success('Спасибо за покупку!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    }

    return !isBooksLoading
        ? (
            <div className="container mt-3">
                <CartTable/>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary w-25" onClick={handleClick}>Перейти к оплате</button>
                </div>
            </div>
        )
        : <Loader target={'cart'}/>
}

export default CartPage
