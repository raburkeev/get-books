const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.get('/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params
        const foundedUser = await User.findById(userId)
        res.status(200).send(foundedUser)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.put('/:userId/cart', auth, async (req, res) => {
    try {
        const {userId} = req.params
        const payload = req.body
        const user = await User.findByIdAndUpdate(userId, {cart: [...payload]}, {new: true})
        res.send(user.cart)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }

})

router.put('/:userId/purchasedBooks', auth, async (req, res) => {
    try {
        const {userId} = req.params
        const payload = req.body
        const user = await User.findByIdAndUpdate(userId, {purchasedBooks: [...payload]}, {new: true})
        res.send(user.purchasedBooks)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.put('/:userId/ratedBooks', auth, async (req, res) => {
    try {
        const {userId} = req.params
        const payload = req.body
        const user = await User.findByIdAndUpdate(userId, {ratedBooks: [...payload]}, {new: true})
        res.send(user.ratedBooks)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

module.exports = router