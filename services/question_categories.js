// Contains all the queries for the table 'queston categories'
const db = require('../configuration/db')

const getAllQuestionCategories = (req, res) => {
    console.log(`Request for all question categories`)
    db.query('SELECT * FROM question_categories ORDER BY question_category_id ASC', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getQuestionCategoriesById = (req, res) => {
    const question_category_id = req.params.question_category_id
    console.log(`Request for question category by id with id #${question_category_id}`)
    db.query('SELECT * FROM question_categories WHERE question_category_id = $1', [question_category_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getQuestionCategoriesByName = (req, res) => {
    const category = req.params.category
    console.log(`Request for question category by name with name: ${category}`)
    db.query('SELECT * FROM question_categories WHERE category = $1', [category], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const createQuestionCategory = (req, res) => {
    const {category} = req.body
    console.log(`Request to create question category with: ${category}`)
    db.query('INSERT INTO question_categories (category) VALUES ($1)', [category], (err, results) => {
        if (err) throw err
        res.status(200).send(`Question category created with: ${category}`)
    })
}