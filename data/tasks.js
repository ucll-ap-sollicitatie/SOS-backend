// Contains all the queries for the table 'comments'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT title, description, deadline, teacher_email, name||' '||surname as full_name FROM tasks t
    INNER JOIN users u ON t.teacher_email = u.email
    ORDER BY task_id DESC`,
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findOne = (task_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tasks WHERE task_id = $1", [task_id], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const add = (title, description, deadline, teacher_email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tasks(title, description, deadline, teacher_email) VALUES ($1, $2, $3, $4)",
      [title, description, deadline, teacher_email],
      (err, results) => {
        queryHelpers.handleQueryAdd(resolve, reject, err, "Task");
      }
    );
  });
};

const update = (title, description, deadline, task_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE tasks SET title = $1, description = $2, deadline = $3 WHERE task_id = $4",
      [title, description, deadline, task_id],
      (err, results) => {
        queryHelpers.handleQueryUpdate(resolve, reject, err, "Task");
      }
    );
  });
};

const deleteOne = (task_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tasks WHERE task_id = $1 RETURNING task_id", [task_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Task");
    });
  });
};

module.exports = {
  findAll,
  findOne,
  add,
  update,
  deleteOne,
};
