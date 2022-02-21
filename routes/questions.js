const Question = require("../data/questions");

const findAll = async (req, res) => {
  console.log(`GET /questions request`);
  await Question.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOne = async (req, res) => {
  console.log(`GET /questions/:id request`);
  const question_id = req.params.question_id;
  await Question.findOne(question_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  console.log(`POST /questions request`);
  const { question, question_category_id } = req.body;
  await Question.add(question, question_category_id)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => res.fail(error));
};

const update = async (req, res) => {
  console.log(`PUT /questions/:id request`);
  const question_id = req.params.question_id;
  const { question } = req.body;
  await Question.update(question_id, question)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => res.fail(error));
};

const deleteOne = async (req, res) => {
  console.log(`DELETE /questions/:id request`);
  const question_id = req.params.question_id;
  await Question.deleteOne(question_id)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => res.fail(error));
};

const findAllQuestionsByQuestionCategory = async (req, res) => {
  console.log(`GET /questions/category/:category_id request`);
  await Question.findAllQuestionsByQuestionCategory(req.params.question_category_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

module.exports = {
  findAll,
  findOne,
  add,
  update,
  deleteOne,
  findAllQuestionsByQuestionCategory,
};
