import React from 'react'
import PropTypes from 'prop-types'
import useStyles from '../../../hooks/useStyles'

const TextAreaField = ({label, name, rows, error, value, onChange}) => {
    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    const {getInputTextClasses} = useStyles()

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}:</label>
            <div className="input-group has-validation">
                <textarea
                    className={getInputTextClasses(error)}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    rows={rows}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}

TextAreaField.defaultProps = {
    rows: 3
}

TextAreaField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.number
}

export default TextAreaField
