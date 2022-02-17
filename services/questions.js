// Contains all the queries for the table 'questions'
const db = require('../configuration/db')

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM questions ORDER BY question_id ASC', (err, results) => {
            if (err) reject(err)
            if (results.rowCount != 0) {
                resolve(results.rows)
            } else {
                resolve({error: 'No questions found.'})
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
                resolve({error: 'Question not found.'})
            }
        })
    })
}

const add = (question) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO questions (question) VALUES ($1)', [question], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Question added.'})
        })
    })
}

const update = (question_id, question) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE questions SET question = $1 WHERE question_id = $2', [question, question_id], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Question updated.'})
        })
    })
}

const deleteOne = (question_id) => {
    return new Promise((resolve, reject) => { 
        db.query('DELETE FROM questions WHERE question_id = $1', [question_id], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Question deleted.'})
        })
    })
}

module.exports = {
    findAll,
    findOne,
    add,
    update,
    deleteOne
}