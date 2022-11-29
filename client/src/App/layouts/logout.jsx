import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../store/user'
import Loader from '../components/common/loader'

const Logout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logout())
    }, [])

    return (
        <div className="row justify-content-end">
            <Loader target={'page'}/>
        </div>
    )
}

export default Logout
