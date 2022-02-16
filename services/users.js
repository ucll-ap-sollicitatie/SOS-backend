// Contains all the queries for the table 'users'
const db = require("../configuration/db")
const bcrypt = require('bcrypt');
const saltRounds = 10;


const getAllUsers = (req, res) => {
    console.log(`Request for all users`)
    db.query('SELECT * FROM users ORDER BY r_u_number ASC', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const r_u_number = req.params.r_u_number
    console.log(`Request for user by id with id ${r_u_number}`)
    db.query('SELECT * FROM users WHERE r_u_number = $1', [r_u_number], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {r_u_number, voornaam, familienaam, e_mail, richting, wachtwoord} = req.body
    console.log(`Request to create user with ${r_u_number}, ${voornaam}, ${familienaam}, ${e_mail}, ${richting}, ${wachtwoord}`)
    bcrypt.hash(wachtwoord, saltRounds, (err, hash) => {
        if (err) throw err
        db.query('INSERT INTO users (r_u_number, voornaam, familienaam, e_mail, richting, hashed_wachtwoord) VALUES ($1, $2, $3, $4, $5, $6)', [r_u_number, voornaam, familienaam, e_mail, richting, hash], (err, results) => {
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
    const {voornaam, familienaam, e_mail, richting} = req.body
    console.log(`Request to update user with id ${r_u_number} and ${voornaam}, ${familienaam}, ${e_mail}, ${richting}`)
    db.query('UPDATE users SET voornaam = $1, familienaam = $2, e_mail = $3, richting = $4 WHERE r_u_number = $5', [voornaam, familienaam, e_mail, richting, r_u_number], (err, results) => {
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