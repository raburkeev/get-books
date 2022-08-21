import React, { useEffect, useState } from 'react'
import api from '../../api'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        api.books.fetchAll().then(data => {
            setBooks(data)
        })
    }, [])

    return JSON.stringify(books) === '[]'
        ? <h1>Loading...</h1>
        : <div className="book_cards_container py-3">
            {books.map(book => (
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
            ))}
        </div>
}

export default Books
