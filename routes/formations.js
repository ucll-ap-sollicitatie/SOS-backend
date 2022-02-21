const Formation = require("../data/formations");

const findAll = async (req, res) => {
  console.log(`GET /formations request`);
  await Formation.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneById = async (req, res) => {
  console.log(`GET /formations/:id request`);
  const formation_id = req.params.formation_id;
  await Formation.findOneById(formation_id)
    .then((result) => res.respond(result))
    .catch((e) => res.failNotFound(e));
};

const findOneByName = async (req, res) => {
  console.log(`GET /formations/name/:id request`);
  const formation_name = req.params.formation_name;
  await Formation.findOneByName(formation_name)
    .then((result) => res.respond(result))
    .catch((e) => res.fail(e));
};

module.exports = {
  findAll,
  findOneById,
  findOneByName,
};
