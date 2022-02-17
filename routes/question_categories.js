const Question_categories = require('../data/question_categories')

const findAll = async (req, res) => {
    let result = await Question_categories.findAll()
    res.respond(result)
}

const findOneById = async (req, res) => {
    let result = await Question_categories.findOneById(req.params.question_category_id)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const findOneByCategory = async (req, res) => {
    const category = req.params.category
    let result = await Question_categories.findOneByName(category)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const add = async (req, res) => { 
    const {category} = req.body
    let result = await Question_categories.add(category)
    res.respond(result)
}

module.exports = {
    findAll,
    findOneById,
    findOneByCategory,
    add
}