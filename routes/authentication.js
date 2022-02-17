const User = require('../data/users')
const bcrypt = require('bcrypt');
const responseHelper = require('express-response-helper').helper();

const logIn = (req, res) => {
    const {r_u_number, password} = req.body
    const user = await User.findOne(r_u_number)
    .catch((error) => {
        res.failNotFound(error)
    })
    bcrypt.compare(password, user.hashed_password, (err, result) => {
        if (err) console.error(err)
        if (result) {
            req.session.user = user
            console.log(`Login successful for user ${r_u_number}`)
            res.redirect('/', 200)
        } else {
            console.log(`Login unsuccessful for user ${r_u_number}`);
            res.redirect('/auth/login')
        }
    })

}

module.exports = {
    logIn
}