const Question_categories = require("../data/question_categories");

const findAll = async (req, res) => {
  console.log(`GET /question-categories request`);
  await Question_categories.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneById = async (req, res) => {
  console.log(`GET /question-categories/:id request`);
  await Question_categories.findOneById(req.params.question_category_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneByCategory = async (req, res) => {
  console.log(`GET /question-categories/category/:category request`);
  const category = req.params.category;
  await Question_categories.findOneByName(category)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  console.log(`POST /question-categories request`);
  const { category } = req.body;
  await Question_categories.add(category)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => res.fail(error));
};

const deleteOne = async (req, res) => {
  console.log(`DELETE /question-categories request`);
  const question_category_id = req.params.question_category_id;
  await Question_categories.deleteOne(question_category_id)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => res.fail(error));
};

module.exports = {
  findAll,
  findOneById,
  findOneByCategory,
  add,
  deleteOne,
};
