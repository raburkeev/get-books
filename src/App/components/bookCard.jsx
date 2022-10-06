import React from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import {calculateRating} from '../../utils/calculateRating'

const BookCard = ({book}) => {
    const history = useHistory()

    const handleBookCardClick = () => {
        history.push(`/all_books/${book.id}`)
    }

    return (
        <div className="card my-3 shadow book_card" key={book.id} onClick={handleBookCardClick}>
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <img src={book.imgUrl} className="book_img" width="250" alt="pic"/>
                    <div className="mt-3">
                        <span className="d-inline-block text-truncate">
                            {book.name}
                        </span>
                        <p className="text-secondary mb-1 text-truncate">{book.author}</p>
                        <p className="text-secondary text-truncate">{`(${book.year}г.)`}</p>
                        <div className="d-flex justify-content-between">
                            <div className="fs-5">
                                <i className="bi bi-star"/>
                                {' '}
                                <span>{calculateRating(book.ratings)}</span>
                            </div>
                            <div>
                                <span className="badge bg-success">{`${book.price}р`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookCard
