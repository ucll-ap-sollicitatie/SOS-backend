const Preference = require("../data/preferences");

const findAll = async (req, res) => {
  console.log(`GET /preferences request`);
  await Preference.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneById = async (req, res) => {
  console.log(`GET /preferences/:id request`);
  const preference_id = req.params.preference_id;
  await Preference.findOneById(preference_id)
    .then((result) => res.respond(result))
    .catch((e) => res.failNotFound(e));
};

const findOneByRUNumber = async (req, res) => {
    console.log(`GET /preferences/r_u_number/:id request`);
    const preference_r_u_number = req.params.preference_r_u_number;
    await Preference.findOneByRUNumber(preference_r_u_number)
      .then((result) => res.respond(result))
      .catch((e) => res.fail(e));
  };

const add = async (req, res) => {
console.log(`POST /preferences request`);
const { r_u_number, preference_1, preference_2, preference_3 } = req.body;
await Preference.add(r_u_number, preference_1, preference_2, preference_3)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => res.fail(error));
};

module.exports = {
  findAll,
  findOneById,
  findOneByRUNumber,
  add,
};
