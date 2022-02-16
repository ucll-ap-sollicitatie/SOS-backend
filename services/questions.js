// Contains all the queries for the table 'questions'
const db = require('../configuration/db')

const getAllQuestions = (req, res) => {
    console.log(`Request for all questions`)
    db.query('SELECT * FROM questions ORDER BY question_id ASC', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getAllQuestionsByQuestionCategoryId = (req, res) => {
    const question_category_id = req.params.question_category_id
    console.log(`Request for all questions by category with category id #${question_category_id}`)
    db.query('SELECT * FROM questions WHERE question_category_id = $1', [question_category_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows[0])
    })
}

const getQuestionById = (req, res) => {
    const question_id = req.params.question_id
    console.log(`Request for question by id with id #${question_id}`)
    db.query('SELECT * FROM questions WHERE question_id = $1', [question_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows[0])
    })
}

const createQuestion = (req, res) => {
    const {question} = req.body
    console.log(`Request to create comment with ${question}`)
    db.query('INSERT INTO questions (question) VALUES ($1)', [question], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question created with text: ${question}`)
    })
}

const updateQuestion = (req, res) => {
    const question_id = req.params.question_id
    const {question} = req.body
    console.log(`Request to update question with id #${question_id} and ${question}`)
    db.query('UPDATE questions SET question = $1 WHERE question_id = $2', [question, question_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question #${question_id} updated with text: ${question}`)
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
    getAllQuestionsByQuestionCategoryId,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestionCategories
}