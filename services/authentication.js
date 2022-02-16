const User = require('./users')
const bcrypt = require('bcrypt');

const logIn = (req, res) => {
    const {r_u_number, password} = req.body
    console.log(`Log in attempt with r_u_number: ${r_u_number} and password: ${password}`)
    const user = User.findOne(req, res)
    bcrypt.compare(password, user.hashed_password, (err, results) => {
        if (err) throw err
        if (results) {
            req.session.user = user
            res.redirect('/')
        } else {
            res.redirect('/auth/login')
        }
    })
}

module.exports = {
    logIn
}