import React, {useContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import bookService from '../services/book.service'
import {toast} from 'react-toastify'
import Loader from '../components/common/loader'

const BooksContext = React.createContext()

export const useBooks = () => {
    return useContext(BooksContext)
}

const BooksProvider = ({children}) => {
    const [bookz, setBooks] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        try {
            const {content} = await bookService.get()
            setBooks(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const {message} = error.response.data
        setError(message)
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }
    }, [error])

    return (
        <BooksContext.Provider value={{bookz}}>
            {!isLoading ? children : <Loader target={'books'}/>}
        </BooksContext.Provider>
    )
}

BooksProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default BooksProvider
