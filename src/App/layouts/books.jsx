import React, {useEffect, useState} from 'react'
import api from '../../api'
import Pagination from '../components/pagination'
import {paginate} from '../../utils/paginate'
import GroupList from '../components/groupList'
import Sorting from '../components/sorting'
import _ from 'lodash'
import BooksList from '../components/booksList'
import Loader from '../components/loader'

const Books = () => {
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedGenre, setSelectedGenre] = useState(null)
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

    if (JSON.stringify(books) !== '[]') {
        const filteredBooks = selectedGenre
            ? books.filter(book => book.genre.id === selectedGenre.id)
            : books
        const booksCount = filteredBooks.length
        const sortedUsers = _.orderBy(filteredBooks, [sortBy.iter], [sortBy.order])
        const booksCrop = paginate(sortedUsers, currentPage, pageSize)

        const handleGenreSelect = (item) => {
            setSelectedGenre(item)
            setCurrentPage(1)
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
                                </div>
                            )
                        }
                    </div>
                    <div className="col-md-10">
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

export default Books
