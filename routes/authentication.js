const { User, bcrypt } = require("./index");

/**
 * Checks posted credentials.
 * * Fails if email or password empty.
 * * Fails if user with email does not exist.
 * * Fails if credentials are wrong.
 * * Fails if user not activated.
 * * Responds with user properties on success.
 * @param {request} req
 * @param {response} res
 * @returns user props
 */
const logIn = async (req, res) => {
  console.log(`POST /auth/login request`);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ error: "Email or password not provided" });
  } else {
    await User.findOneByEmail(email)
      .then((user) => {
        bcrypt
          .compare(password, user.hashed_password)
          .then((result) => {
            if (!result) {
              console.log("Invalid creds");
              res.status(400).send({ error: "Invalid credentials" });
              return;
            } else if (user.activation_token) {
              console.log("unactivated");
              res.status(401).send({ error: "Account not yet confirmed. Please check email." });
              return;
            } else res.respond(user);
          })
          .catch((error) => console.log(error));

        bcrypt.compare(password, user.hashed_password, (err, result) => {
          if (err || !result) {
            console.log("Invalid creds");
            res.status(400).send({ error: "Invalid credentials" });
            return;
          } else if (user.activation_token) {
            console.log("unactivated");
            res.status(401).send({ error: "Account not yet confirmed. Please check email." });
            return;
          } else res.respond(user);
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
