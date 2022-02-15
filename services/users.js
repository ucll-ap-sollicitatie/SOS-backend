// Contains all the queries for the table 'users'
const db = require("../configuration/db")

const getAllUsers = (req, res) => {
    db.query('SELECT * FROM gebruikers ORDER BY r_u_nummer ASC', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM gebruikers WHERE r_u_nummer = $1', [id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {r_u_nummer, voornaam, familienaam, e_mail, richting} = req.body

    db.query('INSERT INTO gebruikers (r_u_nummer, voornaam, familienaam, e_mail, richting) VALUES ($1, $2, $3, $4, $5)', [r_u_nummer, voornaam, familienaam, e_mail, richting], (err, results) => {
        if (err) throw err
        res.status(200).send(`User created with id: ${r_u_nummer}`)
    })
}

const updateUser = (req, res) => {
    const id = req.params.id
    const {voornaam, familienaam, e_mail, richting} = req.body
    
    db.query('UPDATE gebruikers SET voornaam = $1, familienaam = $2, e_mail = $3, richting = $4 WHERE r_u_nummer = $5', [voornaam, familienaam, e_mail, richting, id], (err, results) => {
        if (err) throw err
        res.status(200).send(`User updated with id: ${id}`)
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    
    db.query('DELETE FROM gebruikers WHERE r_u_nummer = $1', [id], (err, results) => {
        if (err) throw err
        res.status(200).send(`User deleted with id: ${id}`)
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}