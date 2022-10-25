import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import genreService from '../services/genre.service'
import {toast} from 'react-toastify'

const GenresContext = React.createContext()

export const useGenres = () => {
    return useContext(GenresContext)
}

const GenresProvider = ({children}) => {
    const [genres, setGenres] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getGenresList()
    }, [])

    const getGenresList = async () => {
        try {
            const {content} = await genreService.get()
            setGenres(content)
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
        <GenresContext.Provider value={{genres, isLoading}}>
            {children}
        </GenresContext.Provider>
    )
}

GenresProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default GenresProvider
