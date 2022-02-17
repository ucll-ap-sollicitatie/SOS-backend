const Role = require('../data/roles')

const findAll = async (req, res) => {
  let result = await Role.findAll()
  res.respond(result)
}

module.exports = {
  findAll
}