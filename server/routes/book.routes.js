const express = require('express')
const Book = require('../models/Book')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const list = await Book.find()
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.patch('/:bookId/ratings', async (req, res) => {
    try {
        const {bookId} = req.params
        const payload = req.body
        const book = await Book.findByIdAndUpdate(bookId, {ratings: payload}, {new: true})
        res.status(200).send(book.ratings)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const payload = req.body
        const newBook = await Book.create(payload)
        res.status(201).send(newBook)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.patch('/:bookId', async (req, res) => {
    try {
        const {bookId} = req.params
        const payload = req.body
        const updatedBook = await Book.findByIdAndUpdate(bookId, payload, {new: true})
        res.status(200).send(updatedBook)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.delete('/:bookId', async (req, res) => {
    try {
        const {bookId} = req.params
        await Book.findByIdAndDelete(bookId)
        res.send(null)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

module.exports = router