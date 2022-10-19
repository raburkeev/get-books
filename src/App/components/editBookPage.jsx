import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import api from '../../api'
import TextField from './textField'
import TextAreaField from './textAreaField'
import NumberField from './numberField'
import Loader from './loader'

const EditBookPage = () => {
    const {bookId} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState({
        name: '',
        imgUrl: '',
        genre: {},
        author: '',
        series: '',
        size: '',
        year: '',
        ageLimit: '',
        price: '',
        description: ''
    })

    useEffect(() => {
        api.books.getById(+bookId)
            .then(data => setData(prevState => ({
                ...prevState,
                ...data
            })))
            .then(() => setIsLoaded(true))
    }, [])

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
    return isLoaded
        ? (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <h1>EditBook</h1>
                            <TextField
                                label="Название"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Ссылка на изображение книги"
                                name="imgUrl"
                                value={data.imgUrl}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Автор"
                                name="author"
                                value={data.author}
                                onChange={handleChange}
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
                            />
                            <NumberField
                                label="Год написания"
                                name="year"
                                value={data.year}
                                onChange={handleChange}
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
        : <Loader target="book info" />
}

export default EditBookPage
