const Question_categories = require("../data/question_categories");

const findAll = async (req, res) => {
  Question_categories.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneById = async (req, res) => {
  Question_categories.findOneById(req.params.question_category_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneByCategory = async (req, res) => {
  const category = req.params.category;
  Question_categories.findOneByName(category)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  const { category } = req.body;
  Question_categories.add(category)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => res.fail(error));
};

module.exports = {
  findAll,
  findOneById,
  findOneByCategory,
  add,
};
