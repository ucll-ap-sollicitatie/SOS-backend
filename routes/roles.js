const Role = require('../data/roles')

const findAll = async (req, res) => {
  Role.findAll()
  .then(result => res.respond(result))
  .catch(error => res.fail(error))
}

module.exports = {
  findAll
}