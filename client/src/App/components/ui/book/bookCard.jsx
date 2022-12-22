import React from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import {calculateRating} from '../../../utils/calculateRating'

const BookCard = ({book, isCatalogCard}) => {
    const history = useHistory()

    const handleBookCardClick = () => {
        if (isCatalogCard) {
            history.push(`/all_books/${book._id}`)
        } else {
            history.push(`/reader/${book._id}`)
        }
    }

    return (
        <div className="card my-3 shadow book_card" onClick={handleBookCardClick}>
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <img src={book.imgUrl} className="book_img" width="250" alt="pic"/>
                    <div className="mt-3 w-100">
                        <span className="d-inline-block text-truncate">
                            {book.name}
                        </span>
                        <p className="text-secondary mb-1 text-truncate">{book.author}</p>
                        <p className="text-secondary text-truncate">{`(${book.year}г.)`}</p>
                        {isCatalogCard && <div className="d-flex justify-content-between align-items-center">
                            <div className="fs-5">
                                <i className="bi bi-star"/>
                                {' '}
                                <span>{calculateRating(book.ratings)}</span>
                            </div>
                            <div>
                                <span className="badge bg-success">{`${book.price}р`}</span>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

BookCard.defaultProps = {
    isCatalogCard: true
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    isCatalogCard: PropTypes.bool.isRequired
}

export default BookCard
