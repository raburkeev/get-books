import React from 'react'
import PropTypes from 'prop-types'
import useStyles from '../../../hooks/useStyles'

const CheckBoxField = ({children, name, value, onChange, error}) => {
    const {getInputCheckClasses} = useStyles()

    const handleChange = () => {
        onChange({name: name, value: !value})
    }

    return (
        <div className="mb-4">
            <div className="form-check">
                <input
                    className={getInputCheckClasses(error)}
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
