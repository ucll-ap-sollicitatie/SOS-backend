// Contains all the queries for the table 'questions'
const db = require('../configuration/db')

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM questions ORDER BY question_id ASC', (err, results) => {
            if (err) reject(err)
            if (results.rowCount != 0) {
                resolve(results.rows)
            } else {
                reject({error: 'No questions found.'})
            }
        })
    })
}

const findOne = (question_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM questions WHERE question_id = $1', [question_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve(results.rows[0])
            } else {
                reject({error: 'Question not found.'})
            }
        })
    })
}

const add = (question, question_category_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO questions (question, question_category_id) VALUES ($1, $2)', [question, question_category_id], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Question added.'})
        })
    })
}

const update = (question_id, question) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE questions SET question = $1 WHERE question_id = $2 RETURNING question_id', [question, question_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve({success: 'Question updated.'})
            } else {
                reject({error: `Question #${question_id} does not exist.`})
            }
        })
    })
}

const deleteOne = (question_id) => {
    return new Promise((resolve, reject) => { 
        db.query('DELETE FROM questions WHERE question_id = $1 RETURNING question_id', [question_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve({success: 'Question deleted.'})
            } else {
                reject({error: `Question #${question_id} does not exist.`})
            }
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
    findOne,
    add,
    update,
    deleteOne,
    findAllQuestionsByQuestionCategory
}