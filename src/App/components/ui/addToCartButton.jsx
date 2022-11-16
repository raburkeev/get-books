import React from 'react'
import PropTypes from 'prop-types'

const AddToCartButton = ({onClick, isUserHasBook, isBookInUserCart, price}) => {
    return (
        <button className="btn btn-success" disabled={isUserHasBook || isBookInUserCart} onClick={onClick}>
            {!isUserHasBook && !isBookInUserCart
                ? (
                    <>
                        <h6>Добавить в корзину</h6>
                        <h6>{`(${price}р.)`}</h6>
                    </>

                )
                : (
                    isBookInUserCart
                        ? 'Книга в вашей корзине'
                        : 'У вас уже есть эта книга'
                ) }
        </button>
    )
}

AddToCartButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    isUserHasBook: PropTypes.bool.isRequired,
    isBookInUserCart: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired
}

export default AddToCartButton
