const Question = require('../data/questions')

const findAll = async (req, res) => {
    Question.findAll()
    .then(result => res.respond(result))
    .catch(error => res.failNotFound(error))
}

const findOne = async (req, res) => {
    const question_id = req.params.question_id
    Question.findOne(question_id)
    .then(result => res.respond(result))
    .catch(error => res.failNotFound(error))
}

const add = async (req, res) => { 
    const {question, question_category_id} = req.body
    Question.add(question, question_category_id)
    .then(result => res.respondCreated(null, result))
    .catch(error => res.fail(error))
}

const update = async (req, res) => {
    const question_id = req.params.question_id
    const {question} = req.body
    Question.update(question_id, question)
    .then(result => res.respondUpdated(null, result))
    .catch(error => res.fail(error))
}

const deleteOne = async (req, res) => {
    const question_id = req.params.question_id
    Question.deleteOne(question_id)
    .then(result => res.respondDeleted(null, result))
    .catch(error => res.fail(error))
}

const findAllQuestionsByQuestionCategory = async (req, res) => {
    Question.findAllQuestionsByQuestionCategory(req.params.question_category_id)
    .then(result => res.respond(result))
    .catch(error => res.failNotFound(error))
}

module.exports = {
    findAll,
    findOne,
    add,
    update,
    deleteOne,
    findAllQuestionsByQuestionCategory
}