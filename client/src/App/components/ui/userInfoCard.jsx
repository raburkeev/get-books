import React from 'react'
import PropTypes from 'prop-types'

const UserInfoCard = ({img, name, email}) => {
    return (
        <div className="card mb-3 mt-3">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <h4>{name}</h4>
                    <img src={img} alt="avatar" className="rounded-circle shadow-1-strong me-3" width="150"/>
                    <p className="text-secondary mb-1 mt-3">{email}</p>
                </div>
            </div>
        </div>
    )
}

UserInfoCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
}

export default UserInfoCard
