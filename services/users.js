// Contains all the queries for the table 'users'
const db = require("../configuration/db")
const bcrypt = require('bcrypt');
const saltRounds = 10;


const getAllUsers = (req, res) => {
    console.log(`Request for all users`)
    db.query('SELECT r_u_number, name, surname, email, photo_url, hashed_password, role, formation FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) ORDER BY r_u_number ASC', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const r_u_number = req.params.r_u_number
    console.log(`Request for user by id with id ${r_u_number}`)
    db.query('SELECT r_u_number, name, surname, email, photo_url, hashed_password, role, formation FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) WHERE r_u_number = $1', [r_u_number], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows[0])
    })
}

const createUser = (req, res) => {
    const {r_u_number, name, surname, email, formation, password} = req.body
    console.log(`Request to create user with ${r_u_number}, ${name}, ${surname}, ${email}, ${formation}, ${password}`)
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err
        db.query('INSERT INTO users (r_u_number, name, surname, email, formation, hashed_password) VALUES ($1, $2, $3, $4, $5, $6)', [r_u_number, name, surname, email, formation, hash], (err, results) => {
            if (err) throw err
            res.status(200).send(`User created with id: ${r_u_number}`)
        })
    })
    // db.query('INSERT INTO users (r_u_number, voornaam, familienaam, e_mail, richting) VALUES ($1, $2, $3, $4, $5)', [r_u_number, voornaam, familienaam, e_mail, richting], (err, results) => {
    //     if (err) throw err
    //     res.status(200).send(`User created with id: ${r_u_number}`)
    // })
}

const updateUser = (req, res) => {
    const r_u_number = req.params.r_u_number
    const {name, surname, email, formation} = req.body
    console.log(`Request to update user with id ${r_u_number} and ${name}, ${surname}, ${email}, ${formation}`)
    db.query('UPDATE users SET name = $1, surname = $2, email = $3, formation = $4 WHERE r_u_number = $5', [name, surname, email, formation, r_u_number], (err, results) => {
        if (err) throw err
        res.status(200).send(`User updated with id: ${r_u_number}`)
    })
}

const deleteUser = (req, res) => {
    const r_u_number = req.params.r_u_number
    console.log(`Request to delete user with id ${r_u_number}`)
    db.query('DELETE FROM users WHERE r_u_number = $1', [r_u_number], (err, results) => {
        if (err) throw err
        res.status(200).send(`User deleted with id: ${r_u_number}`)
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}