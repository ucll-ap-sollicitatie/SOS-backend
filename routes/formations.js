const Formation = require('../data/formations')

const findAll = async (req, res) => {
  let result = await Formation.findAll()
  res.respond(result)
}

const findOneById = async (req, res) => {
  const formation_id = req.params.formation_id
  let result = await Formation.findOneById(formation_id)
  res.respond(result)
}

const findOneByName = async (req, res) => {
  const formation_name = req.params.formation_name
  let result = await Formation.findOneByName(formation_name)
  res.respond(result)
}

module.exports = {
    findAll,
    findOneById,
    findOneByName
}