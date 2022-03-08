const { Task, User } = require("./index");

/**
 * [GET] Handles result of query for finding all tasks.
 */
const findAll = async (req, res, next) => {
  console.log(`GET /tasks request`);
  await Task.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for finding one task.
 */
const findOne = async (req, res, next) => {
  console.log(`GET /tasks/:id request`);
  const task_id = req.params.task_id;
  await Task.findOne(task_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [POST] Handles result of query for adding a task.
 */
const add = async (req, res, next) => {
  console.log(`POST /tasks request`);
  const { title, description, deadline, teacher_email } = req.body;
  if (!title || !teacher_email) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Task.add(title, description, deadline, teacher_email)
    .then((result) => {
      User.findAllByRole(1).then((students) => {
        students.forEach((student) => {
          sendNewTaskToStudentsEmail(student.email);
        });
      });

      res.respondCreated(result);
    })
    .catch((error) => next(error));
};

/**
 * Sends email to all students when getting a new task.
 */
const sendNewTaskToStudentsEmail = async (userEmail) => {
  await Task.sendNewTaskToStudentsEmail(userEmail)
    .then(() => console.log("New task email sent successfully"))
    .catch((e) => console.log(e));
};

/**
 * [PUT] Handles result of query for updating a task.
 */
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

/**
 * [DELETE] Handles result of query for deleting a task.
 */
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
