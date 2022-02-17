const User = require('../data/users')

const findAll = async (req, res) => {
    let result = await User.findAll()
    res.respond(result)
}

const findOneByEmail = async (req, res) => {
    const email = req.params.email
    let result = await User.findOneByEmail(email)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const findOneById = async (req, res) => {
    const r_u_number = req.params.r_u_number
    let result = await User.findOneById(r_u_number)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const add = async (req, res) => { 
    const {r_u_number, name, surname, email, password, role_id, formation_id} = req.body
    let result = await User.add(r_u_number, name, surname, email, password, role_id, formation_id)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result) 
}

const update = async (req, res) => {
    // const User_id = req.params.User_id
    // const {text} = req.body
    // let result = await User.update(text, User_id)
    // .catch((e) => {
    //     res.fail(e)
    // })
    res.respond({info: 'In development'}) 
}

const deleteOne = async (req, res) => {
    const r_u_number = req.params.r_u_number
    let result = await User.deleteOne(r_u_number)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

module.exports = {
    findAll,
    findOneByEmail,
    findOneById,
    add,
    update,
    deleteOne
}