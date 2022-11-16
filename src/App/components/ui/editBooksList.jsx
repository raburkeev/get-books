import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import BooksTable from './booksTable'
import {useDispatch, useSelector} from 'react-redux'
import {deleteBook, getBooksList, getBooksLoadingStatus} from '../../store/books'
import Loader from '../common/loader'

const EditBooksList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [search, setSearch] = useState('')
    const books = useSelector(getBooksList())
    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(search.toLowerCase()) || book.id.toLowerCase().includes(search.toLowerCase()))
    const isLoading = useSelector(getBooksLoadingStatus())
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleDelete = (bookId) => {
        dispatch(deleteBook({bookId}))
    }

    const handleEdit = (bookId) => {
        history.push(`/all_books/${bookId}/edit`)
    }

    return !isLoading
        ? (
            <>
                <input className="form-control m-2" type="search" placeholder="Поиск книги по названию или ID" aria-label="Search" value={search} onChange={handleSearchChange}/>
                <BooksTable books={filteredBooks} onDelete={handleDelete} onEdit={handleEdit} />
            </>
        )
        : <Loader target={'books'}/>
}

export default EditBooksList
