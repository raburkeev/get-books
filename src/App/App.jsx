import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NavBar from './components/navBar'
import Main from './layouts/main'
import Books from './layouts/books'
import BookPage from './components/bookPage'
import Login from './components/login'

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/all_books" exact component={Books}/>
                <Route path="/all_books/:bookId?" component={BookPage}/>
                <Route path="/login/:type?" component={Login} />
                <Redirect to="/"/>
            </Switch>
        </>

    )
}

export default App
