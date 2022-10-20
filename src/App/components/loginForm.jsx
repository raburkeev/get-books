import React, {useEffect, useState} from 'react'
import TextField from './textField'
import * as yup from 'yup'
import CheckBoxField from './checkBoxField'

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    })
    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(data)
    }

    const validateSchema = yup.object().shape({
        password: yup.string().required('Пароль обязателен для заполнения')
            .matches(/(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву')
            .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
            .min(8, 'Пароль должен быть не менее 8 символов'),
        email: yup.string().required('Электронная почта обязательна для заполнения').email('Email введен некорректно')
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
        <div>
            <h3 className="mb-4">Вход в систему</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    type="password"
                    label="Пароль"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <CheckBoxField
                    name="stayOn"
                    value={data.stayOn}
                    onChange={handleChange}
                >
                    Оставаться в системе
                </CheckBoxField>
                <button className="btn btn-success w-100 mx-auto" disabled={isValid}>Войти</button>
            </form>
        </div>
    )
}

export default LoginForm