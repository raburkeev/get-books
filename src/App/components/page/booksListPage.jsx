/*eslint-disable*/
import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import {useHistory} from 'react-router-dom'
import api from '../../../api'
import Pagination from '../common/pagination'
import {paginate} from '../../utils/paginate'
import GroupList from '../common/groupList'
import Sorting from '../ui/sorting'
import BooksList from '../ui/booksList'
import Loader from '../common/loader'
import {useBooks} from '../../hooks/useBooks'

const BooksListPage = () => {
    const bookz = useBooks()
    console.log(bookz)
    const history = useHistory()
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState({iter: 'name', order: 'asc'})
    const pageSize = 10

    useEffect(() => {
        api.books.fetchAll().then(data => {
            setBooks(data)
        })
    }, [])
    useEffect(() => {
        api.genres.fetchAll().then(data => {
            setGenres(data)
        })
    }, [])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSearchChange = (event) => {
        const {value} = event.target
        setSearch(value)
        setSelectedGenre(null)
    }

    if (JSON.stringify(books) !== '[]') {
        const filteredBooks = search
            ? (
                books.filter(book => book.name.toLowerCase().includes(search.trim().toLowerCase()))
            )
            : (
                selectedGenre
                    ? books.filter(book => book.genre.id === selectedGenre.id)
                    : books
            )
        const booksCount = filteredBooks.length
        const sortedUsers = _.orderBy(filteredBooks, [sortBy.iter], [sortBy.order])
        const booksCrop = paginate(sortedUsers, currentPage, pageSize)
        const handleGenreSelect = (item) => {
            setSelectedGenre(item)
            setCurrentPage(1)
            setSearch('')
        }
        const clearFilter = () => {
            setSelectedGenre(null)
            setCurrentPage(1)
        }

        const handleSort = (item) => {
            if (sortBy.iter === item) {
                setSortBy(prevState => ({...prevState, order: prevState.order === 'asc' ? 'desc' : 'asc'}))
            } else {
                setSortBy({iter: item, order: 'asc'})
            }
        }

        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-2 my-3">
                        {JSON.stringify(genres) === '{}'
                            ? <Loader target="genres"/>
                            : (
                                <div className="d-flex flex-column">
                                    <GroupList
                                        items={genres}
                                        selectedItem={selectedGenre}
                                        onItemSelect={handleGenreSelect}
                                    />
                                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                                    <button className="btn btn-primary mt-5" onClick={() => history.push('/add_book')}>Добавить книгу</button>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-md-10">
                        <input className="form-control m-2" type="search" placeholder="Поиск книги по названию" aria-label="Search" value={search} onChange={handleSearchChange}/>
                        <Sorting onSort={handleSort} selectedSort={sortBy} />
                        <BooksList books={booksCrop} />
                    </div>
                    <Pagination
                        itemsCount={booksCount}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        )
    }
    return <Loader target="books" margin={5}/>
}

export default BooksListPage
