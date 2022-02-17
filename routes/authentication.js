const User = require('../data/users')
const bcrypt = require('bcrypt');

const logIn = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.respond({error: 'Email or password not provided'})
    }
    const user = await User.findOneByEmail(email)
    .catch((error) => {
        res.failNotFound(error)
    })
    bcrypt.compare(password, user.hashed_password, (err, result) => {
        if (err) console.error(err)
        if (result) {
            req.session.user = user
            console.log(`Login successful for user ${r_u_number}`)
            res.redirect(200, '/')
        } else {
            console.log(`Login unsuccessful for user ${r_u_number}`);
            res.redirect(200, '/auth/login')
        }
    })

}

module.exports = {
    logIn
}