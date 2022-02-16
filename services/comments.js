// Contains all the queries for the table 'comments'
const db = require('../configuration/db')

const getAllComments = (req, res) => {
    console.log(`Request for all comments`)
    db.query('SELECT * FROM comments ORDER BY comment_id ASC', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getCommentById = (req, res) => {
    const comment_id = req.params.comment_id
    console.log(`Request for comment by id with id #${comment_id}`)
    db.query('SELECT * FROM comments WHERE comment_id = $1', [comment_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const createComment = (req, res) => {
    const {text, feedback, author, video_id} = req.body
    console.log(`Request to create comment with ${text}, ${feedback}, ${author}, #${video_id}`)
    db.query('INSERT INTO comments (tekst, feedback, author, video_id) VALUES ($1, $2, $3, $4)', [text, feedback, author, video_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Comment created with text: ${text}, under video #${video_id} by ${author}`)
    })
}

const updateComment = (req, res) => {
    const comment_id = req.params.comment_id
    const {text} = req.body
    console.log(`Request to update comment with id #${comment_id} and ${text}`)
    db.query('UPDATE comments SET text = $1 WHERE comment_id = $2', [text, comment_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Comment #${comment_id} has been updated to ${text}`)
    })
}

const deleteComment = (req, res) => {
    const comment_id = req.params.comment_id
    console.log(`Request to delete comment with id #${comment_id}`)
    db.query('DELETE FROM comments WHERE comment_id = $1', [comment_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Comment deleted with id: ${comment_id}`)
    })
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}