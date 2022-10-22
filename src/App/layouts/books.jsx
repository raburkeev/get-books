import React from 'react'
import {useParams} from 'react-router-dom'
import EditBookPage from '../components/page/editBookPage'
import BookPage from '../components/page/bookPage'
import BooksListPage from '../components/page/booksListPage'
import BooksProvider from '../hooks/useBooks'

const Books = () => {
    const {bookId, edit} = useParams()
    return (
        <>
            <BooksProvider>
                {
                    bookId
                        ? (
                            edit === 'edit'
                                ? <EditBookPage />
                                : <BookPage />
                        )
                        : <BooksListPage />
                }
            </BooksProvider>
        </>

    )
}

export default Books
