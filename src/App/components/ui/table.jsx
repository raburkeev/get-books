import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import TableCartFooter from './tableCartFooter'

const Table = ({data, columns}) => {
    return (
        <table className="table">
            <TableHeader columns={columns}/>
            <TableBody data={data} columns={columns}/>
            <TableCartFooter data={data}/>
        </table>
    )
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
}

export default Table
