import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Books from './layouts/books'
import Login from './layouts/login'
import AddBookForm from './components/ui/addBookForm'
import AppLoader from './components/ui/hoc/appLoader'
import Logout from './layouts/logout'
import UserPage from './components/page/userPage'
import CartPage from './components/page/cartPage'

const App = () => {
    return (
        <div>
            <AppLoader>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/cart" component={CartPage}/>
                    <Route path="/user/:userId" component={UserPage}/>
                    <Route path="/all_books/:bookId?/:edit?" component={Books}/>
                    <Route path="/add_book" component={AddBookForm}/>
                    <Redirect to="/"/>
                </Switch>
                <ToastContainer/>
            </AppLoader>
        </div>
    )
}

export default App
