import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Books from './layouts/books'
import Login from './layouts/login'
import AddBookForm from './components/ui/addBookForm'
import GenresProvider from './hooks/useGenres'

const App = () => {
    return (
        <>
            <NavBar/>
            <GenresProvider>
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/all_books/:bookId?/:edit?" component={Books}/>
                    <Route path="/add_book" component={AddBookForm}/>
                    <Redirect to="/"/>
                </Switch>
            </GenresProvider>
            <ToastContainer/>
        </>
    )
}

export default App
