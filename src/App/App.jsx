import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NavBar from './components/navBar'
import Main from './layouts/main'
import Books from './layouts/books'
import BookPage from './components/bookPage'
import Login from './components/login'
import EditBookPage from './components/editBookPage'

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login/:type?" component={Login} />
                <Route path="/all_books" exact component={Books}/>
                <Route path="/all_books/:bookId?" exact component={BookPage}/>
                <Route path="/all_books/:bookId/edit" component={EditBookPage}/>
                <Redirect to="/"/>
            </Switch>
        </>

    )
}

export default App
