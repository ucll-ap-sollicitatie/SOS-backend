// Contains all the queries for the table 'queston categories'
const db = require('../configuration/db')

const findAll = () => {
    return new Promise((resolve, reject) => {  
        db.query('SELECT * FROM question_categories ORDER BY question_category_id ASC', (err, results) => {
            if (err) reject(err)
            if (results.rowCount != 0) {
                resolve(results.rows)
            } else {
                reject({error: 'No question categories.'})
            }
        })
    })
}

const findOneById = (question_category_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM question_categories WHERE question_category_id = $1', [question_category_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve(results.rows[0])
            } else {
                reject({error: 'Question category not found.'})
            }
        })
    })
}

const findOneByName = (category) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM question_categories WHERE category = $1', [category], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve(results.rows[0])
            } else {
                reject({error: 'Question category not found.'})
            }
        })
    })
}

const add = (category) => {
    return new Promise((resolve, reject) => { 
        db.query('INSERT INTO question_categories (category) VALUES ($1)', [category], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Question category added.'})
        })
    })
}


const findAllQuestionsByQuestionCategory = (question_category_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM questions WHERE question_category_id = $1', [question_category_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount != 0) {
                resolve(results.rows)
            } else {
                reject({error: 'No questions for this question category.'})
            }
        })
    })
}

module.exports = {
    findAll,
    findOneById,
    findOneByName,
    add,
    findAllQuestionsByQuestionCategory
}