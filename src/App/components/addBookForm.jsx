/*eslint-disable*/
import React, {useEffect, useState} from 'react'
import TextField from './textField'
import NumberField from './numberField'
import TextAreaField from './textAreaField'
import * as yup from 'yup'

const AddBookForm = () => {
    const [data, setData] = useState({
        name: '',
        imgUrl: '',
        genre: {},
        author: '',
        series: '',
        size: 0,
        year: 0,
        ageLimit: '',
        price: 0,
        description: ''
    })
    const [errors, setErrors] = useState({})

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

    const validateSchema = yup.object().shape({
        year: yup.number().required().positive().integer().max(new Date(Date.now()).getFullYear(), 'Год написания книги введен некорректно'),
        size: yup.number().required('Количество страниц обязательно к заполнению').positive().integer(),
        author: yup.string().required('Имя автора книги обязательно к заполнению').min(3, 'Имя автора болжно быть не менее 3х символов'),
        imgUrl: yup.string()
            .required('Ссылка на изображение книги обязательно к заполнению')
            .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Ссылка введена некорректно'),
        name: yup.string().required('Название книги обязательно для заполнения')


        // password: yup.string().required('Пароль обязателен для заполнения')
        //     .matches(/(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву')
        //     .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
        //     .min(8, 'Пароль должен быть не менее 8 символов'),
        // email: yup.string().required('Электронная почта обязательна для заполнения').email('Email введен некорректно')
    })

    const validate = () => {
        validateSchema.validate(data)
            .then(() => setErrors({}))
            .catch(err => setErrors({[err.path]: err.message}))
    }

    useEffect(() => {
        validate()
    }, [data])

    return (
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
                            value={data.size}
                            onChange={handleChange}
                            error={errors.size}
                        />
                        <NumberField
                            label="Год написания"
                            name="year"
                            value={data.year}
                            onChange={handleChange}
                            error={errors.year}
                        />
                        <NumberField
                            label="Цена (руб.)"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                        />
                        <TextAreaField
                            label="Аннотация к книге"
                            rows={10}
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBookForm
