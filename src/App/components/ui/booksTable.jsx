import React from 'react'
import PropTypes from 'prop-types'
import Table from './table'

const BooksTable = ({books, onDelete, onEdit}) => {
    const columns = {
        id: {
            path: 'id',
            name: 'ID'
        },
        name: {
            path: 'name',
            name: 'Название'
        },
        edit: {
            component: (book) => (
                <button
                    onClick={() => onEdit(book.id)}
                    className="btn btn-primary"
                >
                    edit
                </button>
            )
        },
        delete: {
            component: (book) => (
                <button
                    onClick={() => onDelete(book.id)}
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
