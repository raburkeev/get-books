import React from 'react'
import PropTypes from 'prop-types'
import AgeLimitBadge from './ageLimitBadge'
import {useGenres} from '../../../hooks/useGenres'

const BookInfoMainContent = ({name, author, genre, series, year, size, ageLimit, description}) => {
    const {getGenreById} = useGenres()
    const genreObj = getGenreById(genre)

    const getStyleForBadge = (color) => {
        if (color === 'warning' || color === 'info' || color === 'light') {
            return `${color} text-dark`
        } else {
            return color
        }
    }

    return (
        <div className="card mb-2 shadow">
            <div className="card-body">
                <AgeLimitBadge ageLimit={ageLimit} />
                <div>
                    <h1 className="mb-3">{name}</h1>
                    <h4 className="mb-3">{`Автор: ${author}`}</h4>
                    {series && <p className="text-secondary mb-3">{`Серия: "${series}"`}</p>}
                    <h5 className="mb-3">
                        {'Жанр: '}
                        <span className={`badge bg-${getStyleForBadge(genreObj.color)} m-1`}>
                            {genreObj.name}
                        </span>
                    </h5>
                    <p>{`Год написания: ${year}`}</p>
                    <p>{`Количество страниц: ${size}`}</p>
                    <h6>Аннотация к книге:</h6>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

BookInfoMainContent.propTypes = {
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    series: PropTypes.string,
    year: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    ageLimit: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default BookInfoMainContent
