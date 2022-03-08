const { Role } = require("./index");

/**
 * [GET] Handles result of query for finding all roles.
 */
const findAll = async (req, res) => {
  console.log(`GET /roles request`);
  await Role.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.fail(error));
};

module.exports = {
  findAll,
};
