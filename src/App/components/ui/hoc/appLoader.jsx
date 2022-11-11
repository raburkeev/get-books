import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {loadGenresList} from '../../../store/genres'
import {loadBooksList} from '../../../store/books'
import {getIsLoggedIn, loadUser} from '../../../store/user'
import {loadOrdersList} from '../../../store/orders'

const AppLoader = ({children}) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn())

    useEffect(() => {
        dispatch(loadGenresList())
        dispatch(loadBooksList())
        dispatch(loadOrdersList())
        if (isLoggedIn) {
            dispatch(loadUser())
        }
    }, [])

    return (
        children
    )
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AppLoader
