const User = require('../data/users')
const bcrypt = require('bcrypt');

const logIn = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.failValidationError('Email or password not provided.')
    }

    User.findOneByEmail(email)
    .then(user => {
        bcrypt.compare(password, user.hashed_password, (err, result) => {
            if (err) res.failServerError(err)
            if (result) {
                res.respond(user)
            } else {
                res.redirect(500, '/auth/login')
            }
        })
    })
    .catch((error) => {
        if (error.status == 500) {
            res.failServerError(error)
        } else {
            res.failNotFound(error)
        }
        
    })
}

module.exports = {
    logIn
}