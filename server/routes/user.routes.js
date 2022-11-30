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
        const user = await User.findById(userId)
        //todo: изменить логичку так, чтобы в пэйлоад приходил полностью обновленный юзер, чтобы ниже сделать User.findByIdAndUpdate()
        user.cart = payload
        // await user.save()
        console.log(user)
        res.send(user.cart)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.123'
        })
    }

})

module.exports = router