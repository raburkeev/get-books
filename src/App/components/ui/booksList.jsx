import React from 'react'
import BookCard from './book/bookCard'
import PropTypes from 'prop-types'

const BooksList = ({books}) => {
    return (
        <div className="d-flex flex-wrap justify-content-between">
            {books.map(book => (
                <BookCard book={book} key={book.id}/>
            ))}
        </div>
    )
}

BooksList.propTypes = {
    books: PropTypes.array.isRequired
}

export default BooksList
