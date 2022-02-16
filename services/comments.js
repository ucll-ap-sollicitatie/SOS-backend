// Contains all the queries for the table 'comments'
const db = require('../configuration/db')

const getAllComments = (req, res) => {
    console.log(`Request for all comments`)
    db.query('SELECT * FROM commentaar ORDER BY commentaar_id ASC', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getCommentById = (req, res) => {
    const commentaar_id = req.params.comment_id
    console.log(`Request for comment by id with id #${commentaar_id}`)
    db.query('SELECT * FROM commentaar WHERE commentaar_id = $1', [commentaar_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const createComment = (req, res) => {
    const {tekst, feedback, eigenaar, video_id} = req.body
    console.log(`Request to create comment with ${tekst}, ${feedback}, ${eigenaar}, #${video_id}`)
    db.query('INSERT INTO commentaar (tekst, feedback, eigenaar, video_id) VALUES ($1, $2, $3, $4)', [tekst, feedback, eigenaar, video_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Comment created with text: ${tekst}, under video #${video_id} by ${eigenaar}`)
    })
}

const updateComment = (req, res) => {
    const commentaar_id = req.params.comment_id
    const {tekst} = req.body
    console.log(`Request to update comment with id #${commentaar_id} and ${tekst}`)
    db.query('UPDATE commentaar SET tekst = $1 WHERE commentaar_id = $2', [tekst, commentaar_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Comment #${commentaar_id} has been updated to ${tekst}`)
    })
}

const deleteComment = (req, res) => {
    const commentaar_id = req.params.comment_id
    console.log(`Request to delete comment with id #${commentaar_id}`)
    db.query('DELETE FROM commentaar WHERE commentaar_id = $1', [commentaar_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Comment deleted with id: ${commentaar_id}`)
    })
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}