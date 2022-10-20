import React, {useState} from 'react'
import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
    const [formType, setFormType] = useState('login')

    const toggleFormType = () => {
        setFormType(prevState => prevState === 'login' ? 'register' : 'login')
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    {formType === 'login'
                        ? <>
                            <LoginForm/>
                            <p>Еще нет аккаунта? <a role="button" onClick={toggleFormType}>Зарегистрироваться</a></p>
                        </>
                        : <>
                            <RegisterForm/>
                            <p>Уже есть аккаунт? <a role="button" onClick={toggleFormType}>Войти в систему</a></p>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Login
