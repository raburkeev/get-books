import React from 'react'
import PropTypes from 'prop-types'
import Table from '../common/table/table'
import {Link} from 'react-router-dom'
import BookCartImg from './bookCartImg'

const CartTable = ({books}) => {
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
                <Link to={`/all_books/${book.id}`}>{book.name}</Link>
            )
        },
        author: {
            path: 'author',
            name: 'Автор'
        },
        price: {
            path: 'price',
            name: 'Цена'
        }
    }

    return <Table data={books} columns={columns}/>
}

CartTable.propTypes = {
    books: PropTypes.array.isRequired
}

export default CartTable
