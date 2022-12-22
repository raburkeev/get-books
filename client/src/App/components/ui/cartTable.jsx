import React from 'react'
import PropTypes from 'prop-types'
import Table from '../common/table/table'
import {Link} from 'react-router-dom'
import BookCartImg from './bookCartImg'

const CartTable = ({books, onDelete}) => {
    const columns = {
        index: {
            path: 'index',
            name: '#'
        },
        img: {
            path: 'imgUrl',
            name: '',
            component: (book) => (
                <BookCartImg url={book.imgUrl}/>
            )
        },
        name: {
            path: 'name',
            name: 'Название',
            component: (book) => (
                <Link to={`/all_books/${book._id}`}>{book.name}</Link>
            )
        },
        author: {
            path: 'author',
            name: 'Автор'
        },
        price: {
            path: 'price',
            name: 'Цена'
        },
        delete: {
            component: (book) => (
                <button
                    onClick={() => onDelete(book._id)}
                    className="btn btn-danger"
                >
                    <i className="bi bi-x-lg"/>
                </button>
            )
        }
    }

    return <Table data={books} columns={columns}/>
}

CartTable.propTypes = {
    books: PropTypes.array.isRequired,
    onDelete: PropTypes.func
}

export default CartTable
