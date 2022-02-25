const { Preference } = require("./index");

const findAll = async (req, res, next) => {
  console.log(`GET /preferences request`);
  await Preference.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOneById = async (req, res, next) => {
  console.log(`GET /preferences/:id request`);
  const preference_id = req.params.preference_id;
  await Preference.findOneById(preference_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOneByRUNumber = async (req, res, next) => {
  console.log(`GET /preferences/r_u_number/:id request`);
  const preference_r_u_number = req.params.preference_r_u_number;
  await Preference.findOneByRUNumber(preference_r_u_number)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const add = async (req, res, next) => {
  console.log(`POST /preferences request`);
  const { r_u_number, preference_1, preference_2, preference_3 } = req.body;
  if (!r_u_number || !preference_1) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Preference.add(r_u_number, preference_1, preference_2, preference_3)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => next(error));
};

const deleteOne = async (req, res, next) => {
  console.log(`DELETE /preferences/:id request`);
  const r_u_number = req.params.r_u_number;
  await Preference.delete(r_u_number)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => next(error));
};

module.exports = {
  findAll,
  findOneById,
  findOneByRUNumber,
  add,
  deleteOne,
};
