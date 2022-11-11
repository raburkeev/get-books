import React from 'react'
import Table from './table'
import {useSelector} from 'react-redux'
import {getUserCart} from '../../store/user'
import {getBooksByIds} from '../../store/books'
import {Link} from 'react-router-dom'
import BookCartImg from './bookCartImg'

const CartTable = () => {
    const userCart = useSelector(getUserCart())
    const booksFromCart = useSelector(getBooksByIds(userCart))
    const indexedBooksFromCart = booksFromCart.map((book, index) => ({...book, index: index + 1}))
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

    return <Table data={indexedBooksFromCart} columns={columns}/>
}

export default CartTable
