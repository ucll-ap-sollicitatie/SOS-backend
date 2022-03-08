const { Preference } = require("./index");

/**
 * [GET] Handles result of query for finding all preferences.
 */
const findAll = async (req, res, next) => {
  console.log(`GET /preferences request`);
  await Preference.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for finding a user's preferences by email.
 */
const findOneByEmail = async (req, res, next) => {
  console.log(`GET /preferences/:email request`);
  const email = req.params.email;
  await Preference.findOneByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for adding preferences.
 *
 * (Should not be used as adding a user automatically adds preferences.)
 */
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

/**
 * [PUT] Handles result of query for updating a user's preferences by email.
 */
const update = async (req, res, next) => {
  console.log(`PUT /preferences/:email request`);
  const email = req.params.email;
  const { preference_1, preference_2, preference_3 } = req.body;
  await Preference.update(email, preference_1, preference_2, preference_3)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => next(error));
};

/**
 * [DELETE] Handles result of query for deleting a user's preferences by email.
 *
 * (Should not be used as a user must always have preferences.)
 */
const deleteOne = async (req, res, next) => {
  console.log(`DELETE /preferences/:email request`);
  const email = req.params.email;
  await Preference.deleteOne(email)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => next(error));
};

/**
 * [PUT] Handles result of query for updating a user's preferences to toggle introductory text.
 */
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
