const { Question_categories, Preference, Question } = require("./index");

const findAll = async (req, res, next) => {
  console.log(`GET /question-categories request`);
  await Question_categories.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOneById = async (req, res, next) => {
  console.log(`GET /question-categories/:id request`);
  await Question_categories.findOneById(req.params.question_category_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOneByCategory = async (req, res, next) => {
  console.log(`GET /question-categories/category/:category request`);
  const category = req.params.category;
  await Question_categories.findOneByName(category)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const add = async (req, res, next) => {
  console.log(`POST /question-categories request`);
  const { category } = req.body;
  if (!category) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Question_categories.add(category)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => next(error));
};

const update = async (req, res, next) => {
  console.log(`PUT /question-categories request`);
  const question_category_id = req.params.question_category_id;
  const { category, description } = req.body;
  if (!category) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Question_categories.findOneById(question_category_id)
    .then(() => {
      Question_categories.update(question_category_id, category, description)
        .then((result) => res.respondUpdated(null, result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const deleteOne = async (req, res, next) => {
  console.log(`DELETE /question-categories request`);
  const question_category_id = req.params.question_category_id;

  if (!question_category_id === 0) {
    res.status(400).send({ error: "Question category with id 0 can't be deleted." });
  }

  await Question_categories.findOneById(question_category_id)
    .then(() => {
      Preference.setPreference1ToAlgemeen(question_category_id);
      Preference.setPreference2ToAlgemeen(question_category_id);
      Preference.setPreference3ToAlgemeen(question_category_id);
      Question.deleteAllByCategory(question_category_id);
      Question_categories.deleteOne(question_category_id)
        .then((result) => res.respondDeleted(null, result))
        .catch((error) => next(error));
    })
    .then(() => res.status(400).send({ error: "Invalid request or data." }));
};

module.exports = {
  findAll,
  findOneById,
  findOneByCategory,
  add,
  deleteOne,
  update,
};
