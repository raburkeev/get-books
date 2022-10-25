import React from 'react'
import PropTypes from 'prop-types'
import {calculateRating} from '../../../utils/calculateRating'

const BookRating = ({rating}) => {
    console.log(rating)
    console.log(Array.isArray(rating))
    const numberOfRatings = Object.keys(rating).reduce((acc, r) => acc + rating[r], 0)

    return (
        <div className="card mb-3 shadow">
            <div className="card-body">
                <div className=" d-flex flex-column justify-content-center text-center position-relative">
                    <h5 className="card-title">
                        <span>Рейтинг</span>
                    </h5>
                    <h1 className="display-4">
                        <i className="bi bi-star"/>
                        {calculateRating(rating)}
                    </h1>
                    <p className="text-secondary mb-1">{`Оценок ${numberOfRatings}`}</p>
                </div>
            </div>
        </div>
    )
}

BookRating.propTypes = {
    rating: PropTypes.array.isRequired
}

export default BookRating
