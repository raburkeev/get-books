import React from 'react'
import PropTypes from 'prop-types'

const Sorting = ({onSort}) => {
    return (
        <div className="d-flex align-items-center mt-3">
            <p className="h5 me-2">Сортировка:</p>
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item" onClick={() => onSort('name')}>Название</li>
                <li className="list-group-item" onClick={() => onSort('author')}>Автор</li>
                <li className="list-group-item" onClick={() => onSort('numberOfRatings')}>Популярность</li>
                <li className="list-group-item" onClick={() => onSort('year')}>Год</li>
                <li className="list-group-item" onClick={() => onSort('price')}>Цена</li>
            </ul>
        </div>
    )
}

Sorting.propTypes = {
    onSort: PropTypes.func.isRequired
}

export default Sorting
