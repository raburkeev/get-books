import React from 'react'
import PropTypes from 'prop-types'
import Table from '../common/table/table'
import {Link} from 'react-router-dom'

const BooksTable = ({books, onDelete, onEdit}) => {
    const columns = {
        id: {
            path: '_id',
            name: 'ID'
        },
        name: {
            path: 'name',
            name: 'Название',
            component: (book) => (
                <Link to={`/all_books/${book._id}`}>
                    {book.name}
                </Link>
            )
        },
        edit: {
            component: (book) => (
                <button
                    onClick={() => onEdit(book._id)}
                    className="btn btn-primary"
                >
                    edit
                </button>
            )
        },
        delete: {
            component: (book) => (
                <button
                    onClick={() => onDelete(book._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    }
    return <Table columns={columns} data={books}/>
}

BooksTable.propTypes = {
    books: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
}

export default BooksTable
