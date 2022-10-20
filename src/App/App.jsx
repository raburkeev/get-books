import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Books from './layouts/books'
import Login from './layouts/login'
import AddBookForm from './components/ui/addBookForm'

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/all_books/:bookId?/:edit?" component={Books}/>
                <Route path="/add_book" component={AddBookForm}/>
                <Redirect to="/"/>
            </Switch>
        </>

    )
}

export default App
// <Route path="/all_books/:bookId?" exact component={BookPage}/>
// <Route path="/all_books/:bookId/edit" component={EditBookPage}/>
