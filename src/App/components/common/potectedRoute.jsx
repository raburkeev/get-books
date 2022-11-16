import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getIsLoggedIn} from '../../store/user'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = ({component: Component, children, redirect, ...rest}) => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    return (
        <Route {...rest} render={(props) => {
            if (!isLoggedIn) {
                return <Redirect to={
                    {
                        pathname: `/${redirect}`,
                        state: {
                            from: props.location
                        }
                    }
                }/>
            }
            return Component ? <Component {...props} /> : children
        }} />
    )
}

ProtectedRoute.defaultProps = {
    redirect: 'all_books'
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    component: PropTypes.func,
    location: PropTypes.object,
    redirect: PropTypes.string
}

export default ProtectedRoute
