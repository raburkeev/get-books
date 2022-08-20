import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './components/navBar'
import Main from './layouts/main'
import Books from './layouts/books'

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/all_books" component={Books}/>
                <Redirect to="/" />
            </Switch>
        </>

    )
}

export default App
