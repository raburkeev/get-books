import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize)

    if (pageCount === 1) return null

    const pages = _.range(1, pageCount + 1)
    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <button
                        className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                        aria-label="Previous"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {pages.map(page => (
                    <li className="page-item" key={page}>
                        <button
                            className={`page-link ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button
                        className={`page-link ${currentPage === pages.length ? 'disabled' : ''}`}
                        aria-label="Next"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination
