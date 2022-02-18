const User = require("../data/users");
const bcrypt = require("bcrypt");

const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.fail("Email or password not provided");
  } else {
    User.findOneByEmail(email)
      .then((user) => {
        bcrypt.compare(password, user.hashed_password, (err, result) => {
          if (err || !result) res.fail("Invalid credentials");
          if (user.activation_token)
            res.fail("Account not yet confirmed. Please check email.");
          else res.respond(user);
        });
      })
      .catch((error) => {
        res.failNotFound(error);
      });
  }
};
module.exports = {
  logIn,
};
