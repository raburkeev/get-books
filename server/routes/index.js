const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/book', require('./book.routes'))
router.use('/genre', require('./genre.routes'))

module.exports = router