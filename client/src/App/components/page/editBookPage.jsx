import React, {useEffect, useState} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import TextField from '../common/form/textField'
import TextAreaField from '../common/form/textAreaField'
import Loader from '../common/loader'
import * as yup from 'yup'
import SelectField from '../common/form/selectField'
import {ageLimit, getAgeLimit, getAgeLimitFormat} from '../../utils/ageLimit'
import {useDispatch, useSelector} from 'react-redux'
import {getBookById, getBooksLoadingStatus, updateBook} from '../../store/books'
import {getGenresList, getGenresLoadingStatus} from '../../store/genres'
import BackHistoryButton from '../common/backHistoryButton'
import {getIsAdmin} from '../../store/user'

const EditBookPage = () => {
    const dispatch = useDispatch()
    const {bookId} = useParams()
    const isAdmin = useSelector(getIsAdmin())

    if (!isAdmin) {
        return <Redirect to={`/all_books/${bookId}`}/>
    }

    const book = useSelector(getBookById(bookId))
    const genres = useSelector(getGenresList())
    const isBooksLoading = useSelector(getBooksLoadingStatus())
    const isGenresLoading = useSelector(getGenresLoadingStatus())

    const genresArray = !isGenresLoading ? genres.map(genre => ({label: genre.name, value: genre._id})) : []
    const [errors, setErrors] = useState({})
    const [data, setData] = useState({
        name: '',
        imgUrl: '',
        genre: '',
        author: '',
        series: '',
        size: 0,
        year: 0,
        ageLimit: '',
        price: 0,
        description: ''
    })

    useEffect(() => {
        setData(prevState => ({
            ...prevState,
            ...book,
            ageLimit: !isBooksLoading ? getAgeLimitFormat(book.ageLimit) : ''
        }))
    }, [book])

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(updateBook({
            ...data,
            ageLimit: getAgeLimit(data.ageLimit),
            year: +data.year,
            price: +data.price,
            size: +data.size
        }))
    }

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const validateSchema = yup.object().shape({
        description: yup.string().required('Аннотация к книге обязательна для заполнения'),
        price: yup.string().required().matches(/^[1-9]\d*$/, 'Цена введена некорректно').matches(/^(?:[1-9]|\d{2,3}|[1-4]\d{3}|10000)$/, 'Цена слишком велика'),
        ageLimit: yup.string().required('Возрастное ограничение обязательно для заполнения'),
        year: yup.string().required().matches(/^[1-9]\d*$/, 'Год написания введен некорректно'),
        size: yup.string().required().matches(/^[1-9]\d*$/, 'Кол-во страниц введено некорректно').matches(/^(?:[1-9]|\d{2,3}|[1-4]\d{3}|10000)$/, 'Кол-во страниц слишком велико'),
        author: yup.string().required('Имя автора книги обязательно к заполнению').min(3, 'Имя автора болжно быть не менее 3х символов'),
        genre: yup.string().required('Жанр обязателен к заполнению'),
        imgUrl: yup.string()
            .required('Ссылка на изображение книги обязательно к заполнению')
            .matches(/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi, 'Ссылка введена некорректно'),
        name: yup.string().required('Название книги обязательно для заполнения')
    })

    const validate = () => {
        validateSchema.validate(data)
            .then(() => setErrors({}))
            .catch(err => setErrors({[err.path]: err.message}))
    }

    useEffect(() => {
        validate()
    }, [data])

    const isValid = Object.keys(errors).length
    return !isBooksLoading && !isGenresLoading
        ? (
            <>
                <div className="container mt-5">
                    <BackHistoryButton/>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 p-4 shadow">
                            <form onSubmit={handleSubmit}>
                                <h1>EditBook</h1>
                                <TextField
                                    label="Название"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Ссылка на изображение книги"
                                    name="imgUrl"
                                    value={data.imgUrl}
                                    onChange={handleChange}
                                    error={errors.imgUrl}
                                />
                                <SelectField
                                    label="Жанр"
                                    name="genre"
                                    value={data.genre}
                                    onChange={handleChange}
                                    defaultOption="Выбрать жанр..."
                                    options={genresArray}
                                    error={errors.genre}
                                />
                                <TextField
                                    label="Автор"
                                    name="author"
                                    value={data.author}
                                    onChange={handleChange}
                                    error={errors.author}
                                />
                                <TextField
                                    label="Серия"
                                    name="series"
                                    value={data.series}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Количество страниц"
                                    name="size"
                                    value={data.size.toString()}
                                    onChange={handleChange}
                                    error={errors.size}
                                />
                                <TextField
                                    label="Год написания"
                                    name="year"
                                    value={data.year.toString()}
                                    onChange={handleChange}
                                    error={errors.year}
                                />
                                <SelectField
                                    label="Возрастное ограничение"
                                    name="ageLimit"
                                    value={data.ageLimit}
                                    onChange={handleChange}
                                    defaultOption="Выбрать возрастное ограничение..."
                                    options={ageLimit}
                                    error={errors.ageLimit}
                                />
                                <TextField
                                    label="Цена (руб.)"
                                    name="price"
                                    value={data.price.toString()}
                                    onChange={handleChange}
                                    error={errors.price}
                                />
                                <TextAreaField
                                    label="Аннотация к книге"
                                    rows={10}
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    error={errors.description}
                                />
                                <button className="btn btn-primary w-100 mx-auto" disabled={isValid}>Обновить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
        : <Loader target="book info"/>
}

export default EditBookPage
