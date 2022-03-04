const { Preference } = require("./index");

const findAll = async (req, res, next) => {
  console.log(`GET /preferences request`);
  await Preference.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOneByEmail = async (req, res, next) => {
  console.log(`GET /preferences/:email request`);
  const email = req.params.email;
  await Preference.findOneByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const add = async (req, res, next) => {
  console.log(`POST /preferences request`);
  const { email } = req.body;
  if (!email) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Preference.add(email)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => next(error));
};

const update = async (req, res, next) => {
  console.log(`PUT /preferences/:email request`);
  const email = req.params.email;
  const { preference_1, preference_2, preference_3 } = req.body;
  await Preference.update(email, preference_1, preference_2, preference_3)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => next(error));
};

const deleteOne = async (req, res, next) => {
  console.log(`DELETE /preferences/:id request`);
  const email = req.params.email;
  await Preference.deleteOne(email)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => next(error));
};

const toggleIntroduction = async (req, res, next) => {
  console.log("PUT /preferences/introduction");
  const email = req.params.email;
  Preference.toggleIntroduction(email)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => next(error));
};

module.exports = {
  findAll,
  findOneByEmail,
  add,
  update,
  deleteOne,
  toggleIntroduction,
};
