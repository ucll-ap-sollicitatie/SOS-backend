const Formation = require('../data/formations')

const findAll = async (req, res) => {
  Formation.findAll()
  .then(result => res.respond(result))
  .catch(error => res.failNotFound(error))
}

const findOneById = async (req, res) => {
  const formation_id = req.params.formation_id
  Formation.findOneById(formation_id)
  .then(result => res.respond(result))
  .catch(e => res.failNotFound(e))
}

const findOneByName = async (req, res) => {
  const formation_name = req.params.formation_name
  Formation.findOneByName(formation_name)
  .then(result => res.respond(result))
  .catch(e => res.fail(e))
}

module.exports = {
    findAll,
    findOneById,
    findOneByName
}