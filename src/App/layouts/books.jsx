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
        ? 'loading'
        : books.map(book => (
            <div key={book.id}>{ book.name }</div>
        ))
}

export default Books
