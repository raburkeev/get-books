import React from 'react'

const Info = () => {
    return (
        <div className="container mt-3 fs-3">
            <div className="alert alert-primary text-center">
                Чтобы взаимодействовать с панелью администратора, войдите в систему использую следующие данные:
                <div className="alert alert-success">
                    <p>Login: admin@admin.com</p>
                    <p>Password: Test1234</p>
                </div>
            </div>
        </div>
    )
}

export default Info
