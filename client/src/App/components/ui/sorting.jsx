import React from 'react'
import PropTypes from 'prop-types'

const Sorting = ({onSort, selectedSort}) => {
    const sortingList = [
        {name: 'name', label: 'Название'},
        {name: 'author', label: 'Автор'},
        {name: 'numberOfRatings', label: 'Популярность'},
        {name: 'year', label: 'Год'},
        {name: 'price', label: 'Цена'}
    ]

    const renderArrow = (itemName) => {
        if (selectedSort.iter === itemName && selectedSort.order === 'asc') {
            return <i className="bi bi-arrow-down"/>
        } else if (selectedSort.iter === itemName && selectedSort.order === 'desc') {
            return <i className="bi bi-arrow-up"/>
        }
    }

    return (
        <div className="d-flex align-items-center mt-3">
            <p className="h5 me-2">Сортировать:</p>
            <ul className="list-group list-group-horizontal">
                {sortingList.map((item, i) => (
                    <li
                        className="list-group-item"
                        key={i}
                        type="button"
                        onClick={() => onSort(item.name)}
                    >
                        {item.label}
                        {renderArrow(item.name)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

Sorting.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
}

export default Sorting
