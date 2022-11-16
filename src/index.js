import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import reportWebVitals from './reportWebVitals'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import {createStore} from './App/store/createStore'
import history from './App/utils/history'

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Router history={history}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Router>
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
