import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {loadGenresList} from '../../../store/genres'

const AppLoader = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadGenresList())
    }, [])

    return (
        children
    )
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AppLoader
