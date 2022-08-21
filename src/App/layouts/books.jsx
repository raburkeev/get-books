import React, { useEffect, useState } from 'react'
import api from '../../api'
import BookCard from '../components/bookCard'
import Pagination from '../components/pagination'
import { paginate } from '../../utils/paginate'

const Books = () => {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 12

    useEffect(() => {
        api.books.fetchAll().then(data => {
            setBooks(data)
        })
    }, [])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    if (JSON.stringify(books) !== '[]') {
        const booksCount = books.length
        const booksCrop = paginate(books, currentPage, pageSize)

        return (
            <div>
                <div className="book_cards_container py-3">
                    {booksCrop.map(book => (
                        <BookCard book={book} key={book.id}/>
                    ))}
                </div>
                <Pagination
                    itemsCount={booksCount}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        )
    }
    return <h1>Loading...</h1>
}

export default Books
