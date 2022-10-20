import React from 'react'
import PropTypes from 'prop-types'

const CheckBoxField = ({children, name, value, onChange, error}) => {
    const handleChange = () => {
        onChange({name: name, value: !value})
    }

    const getInputClasses = () => {
        return `form-check-input ${error ? 'is-invalid' : ''}`
    }

    return (
        <div className="mb-4">
            <div className="form-check">
                <input
                    className={getInputClasses()}
                    type="checkbox"
                    value=""
                    id={name}
                    onChange={handleChange}
                    checked={value}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    {children}
                </label>
                {error && <div className="invalid-feedback">
                    {error}
                </div>}
            </div>
        </div>
    )
}

CheckBoxField.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default CheckBoxField
