import React from 'react'
import PropTypes from 'prop-types'

const BookCartImg = ({url}) => {
    return (
        <img className="book_cart_img" src={url} alt="bookCartImg"/>
    )
}

BookCartImg.propTypes = {
    url: PropTypes.string.isRequired
}

export default BookCartImg
