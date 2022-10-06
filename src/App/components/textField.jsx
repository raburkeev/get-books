import React, {useState} from 'react'
import PropTypes from 'prop-types'

const TextField = ({label, name, error, type, value, onChange}) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    const getInputClasses = () => {
        return `form-control ${error ? 'is-invalid' : ''}`
    }

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState)
    }
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    type={showPassword ? 'text' : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                {type === 'password' && (
                    <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
                        <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}/>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}

TextField.defaultProps = {
    type: 'text'
}

TextField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default TextField
