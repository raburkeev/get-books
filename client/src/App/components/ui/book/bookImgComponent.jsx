import React from 'react'
import PropTypes from 'prop-types'

const BookImgComponent = ({url}) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center mb-3">
            <img src={url} className="" width="250" alt="bookImg"/>
        </div>
    )
}

BookImgComponent.propTypes = {
    url: PropTypes.string.isRequired
}

export default BookImgComponent
