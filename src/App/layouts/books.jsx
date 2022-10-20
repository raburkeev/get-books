import React from 'react'
import {useParams} from 'react-router-dom'
import EditBookPage from '../components/page/editBookPage'
import BookPage from '../components/page/bookPage'
import BooksListPage from '../components/page/booksListPage'

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
