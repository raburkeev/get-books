import React from 'react'
import PropTypes from 'prop-types'

const CartFooter = ({data}) => {
    const cartSum = data.reduce((acc, el) => acc + el.price, 0)
    return (
        <div className="d-flex justify-content-end alert alert-primary" role="alert">
            <h5>
                К оплате: {cartSum}р.
            </h5>

        </div>

    )
}

CartFooter.propTypes = {
    data: PropTypes.array
}

export default CartFooter
