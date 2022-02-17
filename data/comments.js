// Contains all the queries for the table 'comments'
const db = require('../configuration/db')

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM comments ORDER BY comment_id ASC', (err, results) => {
            if (err) reject(err)
            if (results.rowCount != 0) {
                resolve(results.rows)
            } else {
                reject({error: 'No comments found.'})
            }
        })
    })
}

const findOne = (comment_id) => {
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM comments WHERE comment_id = $1', [comment_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve(results.rows[0])
            } else {
                reject({error: 'Comment not found.'})
            }
        })
    })
}

const add = (text, feedback, author, video_id) => {
    return new Promise((resolve, reject) => { 
        db.query('INSERT INTO comments (text, feedback, author, video_id) VALUES ($1, $2, $3, $4)', [text, feedback, author, video_id], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Comment added.'})
        })
    })
}

const update = (text, comment_id) => {
    return new Promise((resolve, reject) => {  
        db.query('UPDATE comments SET text = $1 WHERE comment_id = $2 RETURNING comment_id', [text, comment_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve({success: 'Comment updated.'})
            } else {
                reject({error: `Comment #${comment_id} does not exist.`})
            }
        })
    })
}

const deleteOne = (comment_id) => {
    return new Promise((resolve, reject) => {  
        db.query('DELETE FROM comments WHERE comment_id = $1', [comment_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve({success: 'Comment deleted.'})
            } else {
                reject({error: `Comment #${comment_id} does not exist.`})
            }
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