// Contains all the queries for the table 'comments'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT task_id, title, description, deadline, teacher_email, name||' '||surname as full_name FROM tasks t
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

const sendNewTaskToStudentsEmail = (userEmail) => {
  return new Promise((resolve, reject) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: userEmail,
      from: "slimopsollicitatie2022@gmail.com",
      subject: "SOS - Nieuwe taak",
      html: `
        <h3>Nieuwe taak op Slim op sollicitatie!</h3>
        <p>Beste, u heeft zojuist een nieuwe taak gekregen. Klik op volgende link om de taak te bekijken.</p>
        <p><a target="_" href="${process.env.FRONTEND_URL}/tasks">Bekijk taak</a></p>
        `,
    };

    sgMail
      .send(msg)
      .then(() => resolve("Email sent."))
      .catch((e) => reject(e));
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

const deleteOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tasks WHERE teacher_email = $1 RETURNING task_id", [email], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Task");
    });
  });
};

module.exports = {
  findAll,
  findOne,
  add,
  sendNewTaskToStudentsEmail,
  update,
  deleteOne,
  deleteOneByEmail,
};
