import React from 'react'
import PropTypes from 'prop-types'

const AgeLimitBadge = ({ageLimit}) => {
    const getBadgeClasses = (ageLimit) => {
        ageLimit = +ageLimit.split('').splice(0, ageLimit.length - 1).join('')
        switch (ageLimit) {
            case 18:
                return 'danger'
            case 16:
                return 'warning'
            case 12:
                return 'success'
            case 6:
                return 'primary'
            case 0:
                return 'info'
        }
    }

    return (
        <h3>
            <span className={`badge rounded-pill bg-${getBadgeClasses(ageLimit)} position-absolute top-0 end-0 m-1`}>
                {ageLimit}
            </span>
        </h3>
    )
}

AgeLimitBadge.propTypes = {
    ageLimit: PropTypes.string.isRequired
}

export default AgeLimitBadge
