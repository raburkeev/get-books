import React from 'react'
import {useParams} from 'react-router-dom'
import EditBookPage from '../components/editBookPage'
import BookPage from '../components/bookPage'
import BooksListPage from '../components/booksListPage'

const Books = () => {
    const {bookId, edit} = useParams()
    return (
        bookId
            ? (
                edit === 'edit'
                    ? <EditBookPage />
                    : <BookPage />
            )
            : <BooksListPage />
    )
}

export default Books
