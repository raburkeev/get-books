import React, {useEffect, useState} from 'react'
import TextField from '../common/form/textField'
import NumberField from '../common/form/numberField'
import TextAreaField from '../common/form/textAreaField'
import * as yup from 'yup'
import api from '../../../api'
import SelectField from '../common/form/selectField'
import Loader from '../common/loader'
import {ageLimitArray, getAgeLimit} from '../../utils/ageLimitArray'

const AddBookForm = () => {
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
    const [errors, setErrors] = useState({})
    const [genres, setGenres] = useState({})
    const [isLoading, setLoading] = useState(true)
    const genresArray = Object.keys(genres).map(genre => ({label: genres[genre].name, value: genres[genre].id}))

    useEffect(() => {
        api.genres.fetchAll().then((data) => setGenres(data)).then(() => setLoading(false))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log({
            ...data,
            ageLimit: getAgeLimit(data.ageLimit)
        })
    }

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validateSchema = yup.object().shape({
        description: yup.string().required('Аннотация к книге обязательна для заполнения'),
        price: yup.number().required().positive().integer().max(10000, 'Цена слишком велика!'),
        ageLimit: yup.string().required('Возрастное ограничение обязательно для заполнения'),
        year: yup.number().required().positive().integer().max(new Date(Date.now()).getFullYear(), 'Год написания книги введен некорректно'),
        size: yup.number().required('Количество страниц обязательно к заполнению').positive().integer(),
        author: yup.string().required('Имя автора книги обязательно к заполнению').min(3, 'Имя автора болжно быть не менее 3х символов'),
        genre: yup.string().required('Жанр обязателен к заполнению'),
        imgUrl: yup.string()
            .required('Ссылка на изображение книги обязательно к заполнению')
            .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Ссылка введена некорректно'),
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

    return (
        !isLoading
            ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 p-4 shadow">
                            <form onSubmit={handleSubmit}>
                                <h1>Форма добавления книги</h1>
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
                                <NumberField
                                    label="Количество страниц"
                                    name="size"
                                    value={+data.size}
                                    onChange={handleChange}
                                    error={errors.size}
                                />
                                <NumberField
                                    label="Год написания"
                                    name="year"
                                    value={+data.year}
                                    onChange={handleChange}
                                    error={errors.year}
                                />
                                <SelectField
                                    label="Возрастное ограничение"
                                    name="ageLimit"
                                    value={data.ageLimit}
                                    onChange={handleChange}
                                    defaultOption="Выбрать возрастное ограничение..."
                                    options={ageLimitArray}
                                    error={errors.ageLimit}
                                />
                                <NumberField
                                    label="Цена (руб.)"
                                    name="price"
                                    value={+data.price}
                                    onChange={handleChange}
                                    price={errors.price}
                                />
                                <TextAreaField
                                    label="Аннотация к книге"
                                    rows={10}
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                />
                                <button className="btn btn-primary w-100 mx-auto" disabled={isValid}>Добавить</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
            : <Loader target={'form'}/>
    )
}

export default AddBookForm
