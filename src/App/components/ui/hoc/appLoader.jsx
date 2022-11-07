import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {loadGenresList} from '../../../store/genres'
import {loadBooksList} from '../../../store/books'

const AppLoader = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadGenresList())
        dispatch(loadBooksList())
    }, [])

    return (
        children
    )
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AppLoader
