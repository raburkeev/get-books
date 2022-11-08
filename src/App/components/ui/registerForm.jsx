import React, {useEffect, useState} from 'react'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import {signUp} from '../../store/user'

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        license: false
    })
    const [errors, setErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(data)
        dispatch(signUp(data))
    }

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validateSchema = yup.object().shape({
        name: yup.string()
            .required('Имя обязательно для заполнения')
            .matches(/(?=.*[A-ZА-Я])/, 'Имя должено содержать хотя бы одну заглавную букву'),
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

    const isValid = Object.keys(errors).length === 0 && data.license === true

    return (
        <div>
            <h3 className="mb-4">Регистрация</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Введите ваш email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    type="password"
                    label="Введите пароль"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <TextField
                    label="Введите имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <CheckBoxField
                    name="license"
                    value={data.license}
                    onChange={handleChange}
                >
                    Соглашаюсь с <a role="button" className="text-decoration-underline">лицензионным соглашением</a>
                </CheckBoxField>
                <button className="btn btn-success w-100 mx-auto" disabled={!isValid}>Зарегистрироваться</button>
            </form>
        </div>
    )
}

export default RegisterForm
