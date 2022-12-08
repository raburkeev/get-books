import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import NavBar from './components/ui/navBar'
import Books from './layouts/books'
import Login from './layouts/login'
import AppLoader from './components/ui/hoc/appLoader'
import Logout from './layouts/logout'
import UserPage from './components/page/userPage'
import CartPage from './components/page/cartPage'
import ProtectedRoute from './components/common/potectedRoute'
import Reader from './components/ui/reader'
import AdminPanel from './layouts/adminPanel'
import EditBookPage from './components/page/editBookPage'

const App = () => {
    return (
        <div>
            <AppLoader>
                <NavBar/>
                <Switch>
                    <ProtectedRoute path="/admin/:type?" exact component={AdminPanel}/>
                    <ProtectedRoute path="/admin/editBooksList/:bookId?" component={EditBookPage}/>
                    <Route path="/login" component={Login}/>
                    <ProtectedRoute path="/logout" component={Logout}/>
                    <ProtectedRoute path="/cart" isAdmin component={CartPage}/>
                    <ProtectedRoute path="/user/:userId" component={UserPage}/>
                    <Route path="/all_books/:bookId?" component={Books}/>
                    <Route path="/reader/:bookId" component={Reader}/>
                    <Redirect to="/all_books"/>
                </Switch>
                <ToastContainer/>
            </AppLoader>
        </div>
    )
}

export default App
