const Comment = require('../data/comments')

const findAll = async (req, res) => {
    console.info(`HTTP request to find all comments.`)
    let result = await Comment.findAll()
    res.respond(result)
}

const findOne = async (req, res, next) => {
    const comment_id = req.params.comment_id
    console.info(`HTTP request to find one comment #${comment_id}`)
    Comment.findOne(comment_id)
    .catch((error) => {
        res.fail(error)
    })
    res.respond(result)
}

const add = async (req, res) => { 
    const {text, feedback, author, video_id} = req.body
    console.info(`HTTP request to add comment [text:${text}, feedback:${feedback}, author:${author}, video_id:${video_id}]`)
    let result = await Comment.add(text, feedback, author, video_id)
    .catch((error) => {
        res.fail(error)
    })
    res.respond(result) 
}

const update = async (req, res) => {
    const comment_id = req.params.comment_id
    const {text} = req.body
    console.info(`HTTP request to update comment ${comment_id} with text: ${text}`)
    let result = await Comment.update(text, comment_id)
    .catch((error) => {
        res.fail(error)
    })
    res.respond(result) 
}

const deleteOne = async (req, res) => {
    const comment_id = req.params.comment_id
    console.info(`HTTP request to delete one comment ${comment_id}`)
    let result = await Comment.deleteOne(comment_id)
    .catch((error) => {
        res.fail(error)
    })
    res.respond(result) 
}

module.exports = {
    findAll,
    findOne,
    add,
    update,
    deleteOne
}