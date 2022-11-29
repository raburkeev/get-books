import React from 'react'
import PropTypes from 'prop-types'
import useStyles from '../../../hooks/useStyles'

const AgeLimitBadge = ({ageLimit}) => {
    const {getBadgeClasses} = useStyles()

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
