import React from 'react'
import UserInfoCard from '../ui/userInfoCard'
import {useSelector} from 'react-redux'
import {getUser, getUserLoadingStatus} from '../../store/user'
import UserBooksCard from '../ui/userBooksCard'
import Loader from '../common/loader'

const UserPage = () => {
    const user = useSelector(getUser())
    const isLoading = useSelector(getUserLoadingStatus())

    return !isLoading
        ? (
            <div className="container">
                <h3 className="text-center">Профиль пользователя</h3>
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfoCard img={user.img} name={user.name} email={user.email} />
                    </div>
                    <div className="col-md-8">
                        <UserBooksCard />
                    </div>
                </div>
            </div>
        )
        : <Loader target={'user'}/>
}

export default UserPage
