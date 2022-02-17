const Question = require('../data/questions')

const findAll = async (req, res) => {
    let result = await Question.findAll()
    res.respond(result)
}

const findOne = async (req, res) => {
    const question_id = req.params.question_id
    let result = await Question.findOne(question_id)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const add = async (req, res) => { 
    const {question, question_category_id} = req.body
    let result = await Question.add(question, question_category_id)
    .catch((error) => {
        res.fail(error)
    })
    res.respond(result)
}

const update = async (req, res) => {
    const question_id = req.params.question_id
    const {question} = req.body
    let result = await Question.update(question_id, question)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result) 
}

const deleteOne = async (req, res) => {
    const question_id = req.params.question_id
    let result = await Question.deleteOne(question_id)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const findAllQuestionsByQuestionCategory = async (req, res) => {
    let result = await Question.findAllQuestionsByQuestionCategory(req.params.question_category_id)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

module.exports = {
    findAll,
    findOne,
    add,
    update,
    deleteOne,
    findAllQuestionsByQuestionCategory
}