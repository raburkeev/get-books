
const useStyles = () => {
    const getInputTextClasses = (error) => {
        return `form-control ${error ? 'is-invalid' : ''}`
    }

    const getInputCheckClasses = (error) => {
        return `form-check-input ${error ? 'is-invalid' : ''}`
    }

    const getInputSelectClasses = (error) => {
        return `form-select ${error ? 'is-invalid' : ''}`
    }

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

    return {getInputTextClasses, getInputCheckClasses, getInputSelectClasses, getBadgeClasses}
}

export default useStyles
