// Contains all the queries for the table 'questions'
const db = require('../configuration/db')

const getAllQuestions = (req, res) => {
    db.query('SELECT * FROM vragen ORDER BY vraag_id ASC', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getQuestionById = (req, res) => {
    const vraag_id = req.params.vraag_id

    db.query('SELECT * FROM vragen WHERE vraag_id = $1', [vraag_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const createQuestion = (req, res) => {
    const {vraag} = req.body

    db.query('INSERT INTO vragen (vraag) VALUES ($1)', [vraag], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question created with text: ${vraag}`)
    })
}

const updateQuestion = (req, res) => {
    const vraag_id = req.params.vraag_id
    const {vraag} = req.body
    db.query('UPDATE vragen SET vraag = $1 WHERE vraag_id = $2', [vraag, vraag_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question #${vraag_id} updated with text: ${vraag}`)
    })
}

const deleteQuestion = (req, res) => {
    const vraag_id = req.params.vraag_id

    db.query('DELETE FROM vragen WHERE vraag_id = $1', [vraag_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question deleted with id: ${vraag_id}`)
    })
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
}