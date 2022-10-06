import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({target, margin}) => {
    return (
        <div className="container">
            <div className={`d-flex justify-content-center align-items-center ${margin ? `m-${margin}` : ''}`}>
                <div className="spinner-border spinner-border-sm" role="status"/>
                <strong className="mx-1">Loading {target}...</strong>
            </div>
        </div>
    )
}

Loader.defaultProps = {
    margin: null
}

Loader.propTypes = {
    target: PropTypes.string.isRequired,
    margin: PropTypes.number
}

export default Loader
