const { Task } = require("./index");

const findAll = async (req, res, next) => {
  console.log(`GET /tasks request`);
  await Task.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOne = async (req, res, next) => {
  console.log(`GET /tasks/:id request`);
  const task_id = req.params.task_id;
  await Task.findOne(task_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const add = async (req, res, next) => {
  console.log(`POST /tasks request`);
  const { title, description, deadline, teacher_email } = req.body;
  if (!title || !teacher_email) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Task.add(title, description, deadline, teacher_email)
    .then((result) => res.respondCreated(result))
    .catch((error) => next(error));
};

const update = async (req, res, next) => {
  console.log(`PUT /tasks/:id request`);
  const task_id = req.params.task_id;
  const { title, description, deadline } = req.body;
  if (!title) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Task.findOne(task_id)
    .then(() => {
      Task.update(title, description, deadline, task_id)
        .then((result) => res.respondUpdated(result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const deleteOne = async (req, res, next) => {
  console.log(`DELETE /tasks/:id request`);
  const task_id = req.params.task_id;
  await Task.findOne(task_id)
    .then(() => {
      Task.deleteOne(task_id)
        .then((result) => res.respondDeleted(result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

module.exports = {
  findAll,
  findOne,
  add,
  update,
  deleteOne,
};
