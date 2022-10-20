import React from 'react'
import PropTypes from 'prop-types'

const NumberField = ({label, name, error, value, onChange}) => {
    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    const getInputClasses = () => {
        return `form-control ${error ? 'is-invalid' : ''}`
    }
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}:</label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    type="number"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}

NumberField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
}

export default NumberField
