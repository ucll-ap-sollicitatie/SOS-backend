const User = require("../data/users");

const findAll = async (req, res) => {
  User.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneByEmail = async (req, res) => {
  const email = req.params.email;
  User.findOneByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneById = async (req, res) => {
  const r_u_number = req.params.r_u_number;
  User.findOneById(r_u_number)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  const { r_u_number, name, surname, email, password, role_id, formation_id } =
    req.body;
  User.add(r_u_number, name, surname, email, password, role_id, formation_id)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => res.fail(error));
};

const update = async (req, res) => {
  // const User_id = req.params.User_id
  // const {text} = req.body
  // let result = await User.update(text, User_id)
  // .catch((e) => {
  //     res.fail(e)
  // })
  res.fail("In development", 400);
};

const deleteOne = async (req, res) => {
  const r_u_number = req.params.r_u_number;
  User.deleteOne(r_u_number)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => res.fail(error));
};

module.exports = {
  findAll,
  findOneByEmail,
  findOneById,
  add,
  update,
  deleteOne,
};
