import React from 'react'
import PropTypes from 'prop-types'
import Table from '../common/table/table'

const BooksTable = ({books, onDelete, onEdit}) => {
    const columns = {
        id: {
            path: '_id',
            name: 'ID'
        },
        name: {
            path: 'name',
            name: 'Название'
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
