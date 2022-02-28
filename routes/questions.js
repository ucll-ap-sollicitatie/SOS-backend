const { Question } = require("./index");

const findAll = async (req, res, next) => {
  console.log(`GET /questions request`);
  await Question.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOne = async (req, res, next) => {
  console.log(`GET /questions/:id request`);
  const question_id = req.params.question_id;
  await Question.findOne(question_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const add = async (req, res, next) => {
  console.log(`POST /questions request`);
  const { question, question_category_id } = req.body;
  if (!question || !question_category_id) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Question.add(question, question_category_id)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => next(error));
};

const update = async (req, res, next) => {
  console.log(`PUT /questions/:id request`);
  const question_id = req.params.question_id;
  const { question } = req.body;
  if (!question) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Question.findOne(question_id)
    .then(() => {
      Question.update(question_id, question)
        .then((result) => res.respondUpdated(null, result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const deleteOne = async (req, res, next) => {
  console.log(`DELETE /questions/:id request`);
  const question_id = req.params.question_id;
  await Question.findOne(question_id)
    .then(() => {
      Question.deleteOne(question_id)
        .then((result) => res.respondDeleted(null, result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const findAllQuestionsByQuestionCategory = async (req, res, next) => {
  console.log(`GET /questions/category/:category_id request`);
  await Question.findAllQuestionsByQuestionCategory(req.params.question_category_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findRandomQuestions = async (req, res, next) => {
  console.log(`GET /videos/random request`);
  await Question.findRandomQuestions(req.params.email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

module.exports = {
  findAll,
  findOne,
  add,
  update,
  deleteOne,
  findAllQuestionsByQuestionCategory,
  findRandomQuestions,
};
