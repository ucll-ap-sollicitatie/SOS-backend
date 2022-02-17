const Comment = require('../data/comments')

const findAll = async (req, res) => {
    let result = await Comment.findAll()
    res.respond(result)
}

const findOne = async (req, res) => {
    const comment_id = req.params.comment_id
    let result = await Comment.findOne(comment_id)
    res.respond(result)
}

const add = async (req, res) => { 
    const {text, feedback, author, video_id} = req.body
    let result = await Comment.add(text, feedback, author, video_id)
    res.respond(result) 
}

const update = async (req, res) => {
    const comment_id = req.params.comment_id
    const {text} = req.body
    let result = await Comment.update(text, comment_id)
    res.respond(result) 
}

const deleteOne = async (req, res) => {
    const comment_id = req.params.comment_id
    let result = await Comment.deleteOne(comment_id)
    res.respond(result) 
}

module.exports = {
    findAll,
    findOne,
    add,
    update,
    deleteOne
}