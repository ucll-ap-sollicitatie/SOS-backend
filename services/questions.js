// Contains all the queries for the table 'questions'
const db = require('../configuration/db')

const getAllQuestions = (req, res) => {
    console.log(`Request for all questions`)
    db.query('SELECT * FROM questions ORDER BY question_id ASC', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getQuestionById = (req, res) => {
    const question_id = req.params.question_id
    console.log(`Request for question by id with id #${question_id}`)
    db.query('SELECT * FROM questions WHERE question_id = $1', [question_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const createQuestion = (req, res) => {
    const {vraag} = req.body
    console.log(`Request to create comment with ${vraag}`)
    db.query('INSERT INTO questions (vraag) VALUES ($1)', [vraag], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question created with text: ${vraag}`)
    })
}

const updateQuestion = (req, res) => {
    const question_id = req.params.question_id
    const {vraag} = req.body
    console.log(`Request to update question with id #${question_id} and ${vraag}`)
    db.query('UPDATE questions SET vraag = $1 WHERE question_id = $2', [vraag, question_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question #${question_id} updated with text: ${vraag}`)
    })
}

const deleteQuestion = (req, res) => {
    const question_id = req.params.question_id
    console.log(`Request to delete question with id #${question_id}`)
    db.query('DELETE FROM questions WHERE question_id = $1', [question_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question deleted with id: ${question_id}`)
    })
}

const getAllQuestionCategories = (req, res) => {
    console.log(`Request for all questions`)
    db.query('SELECT * FROM question_categories', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestionCategories
}