/*eslint-disable*/
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getBookById, getBooksLoadingStatus} from '../../store/books'
import {getStyleForGenreBadge} from '../../utils/getStyleForGenreBadge'
import {getGenreById, getGenresLoadingStatus} from '../../store/genres'
import SelectField from '../common/form/selectField'
import Loader from '../common/loader'

const RateBook = () => {
    const {bookId} = useParams()
    const book = useSelector(getBookById(bookId))
    const isBooksLoading = useSelector(getBooksLoadingStatus())
    const genre = useSelector(getGenreById(book.genre))
    const isGenresLoading = useSelector(getGenresLoadingStatus())

    const ratingsArray = [
        {label: 1, value: 0},
        {label: 2, value: 1},
        {label: 3, value: 2},
        {label: 4, value: 3},
        {label: 5, value: 4},
    ]

    const [data, setData] = useState({
        rate: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(data)
    }

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    return !isBooksLoading && !isGenresLoading
        ? (
            <div className="container mt-3">
                <div className="row gutters-sm">
                    <div className="col-md-8">
                        <div className="card mb-2 shadow">
                            <div className="card-body">
                                <div className="d-flex gap-5">
                                    <img src={book.imgUrl} alt="bookImg" width="250"/>
                                    <div>
                                        <h1 className="mb-3">{book.name}</h1>
                                        <h4 className="mb-3">{`Автор: ${book.author}`}</h4>
                                        {book.series && <p className="text-secondary mb-3">{`Серия: "${book.series}"`}</p>}
                                        <h5 className="mb-3">
                                            {'Жанр: '}
                                            <span className={`badge bg-${getStyleForGenreBadge(genre.color)} m-1`}>
                                                {genre.name}
                                            </span>
                                        </h5>
                                        <form onSubmit={handleSubmit}>
                                            <SelectField
                                                label="Ваша оценка"
                                                name="rate"
                                                value={data.rate}
                                                defaultOption="Выберите оценку"
                                                options={ratingsArray}
                                                onChange={handleChange}
                                            />
                                            <button className="btn btn-primary">Отправить</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        : <Loader target={'book info'}/>
}

export default RateBook
