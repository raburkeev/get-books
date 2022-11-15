import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {updateBookRate} from '../../store/books'
import SelectField from '../common/form/selectField'
import {getUserId} from '../../store/user'

const RateBook = () => {
    const dispatch = useDispatch()
    const {bookId} = useParams()
    const userId = useSelector(getUserId())

    const ratingsArray = [
        {label: 1, value: 0},
        {label: 2, value: 1},
        {label: 3, value: 2},
        {label: 4, value: 3},
        {label: 5, value: 4}
    ]

    const [data, setData] = useState({
        rate: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(updateBookRate({
            bookId,
            rate: +data.rate,
            userId
        }))
    }

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <div className="d-flex justify-content-center text-center">
                    <form onSubmit={handleSubmit}>
                        <SelectField
                            label="Пожалуйста, поставьте оценку"
                            name="rate"
                            value={data.rate}
                            defaultOption="Ваша оценка"
                            options={ratingsArray}
                            onChange={handleChange}
                        />
                        <button className="btn btn-primary" disabled={!data.rate}>Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RateBook
