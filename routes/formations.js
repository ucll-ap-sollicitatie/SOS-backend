const { Formation } = require("./index");

/**
 * [GET] Handles result of query for getting all formations.
 */
const findAll = async (req, res, next) => {
  console.log(`GET /formations request`);
  await Formation.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for finding a formation by id.
 */
const findOneById = async (req, res, next) => {
  console.log(`GET /formations/:id request`);
  const formation_id = req.params.formation_id;
  await Formation.findOneById(formation_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for finding a formation by name.
 */
const findOneByName = async (req, res, next) => {
  console.log(`GET /formations/name/:id request`);
  const formation_name = req.params.formation_name;
  await Formation.findOneByName(formation_name)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

module.exports = {
  findAll,
  findOneById,
  findOneByName,
};
