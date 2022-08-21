import React from 'react'
import PropTypes from 'prop-types'

const BookCard = ({ book }) => {
    return (
        <div className="card" key={book.id}>
            <img src={book.imgUrl} className="card-img-top" alt="pic"/>
            <div className="card-body d-flex m-0 p-0">
                <div className="d-flex flex-column">
                    <span className="fs-6 m-0">{book.rate}</span>
                    <span className="fs-6">{book.numberOfRatings}</span>
                </div>
                <span className="btn btn-primary btn-sm">
                    {book.genre.name}
                </span>
            </div>
        </div>
    )
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookCard
