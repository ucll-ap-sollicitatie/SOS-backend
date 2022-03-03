require("dotenv").config();
const { User, Preference, Task, Comment, Favorite, Video, crypto } = require("./index");

const findAll = async (req, res, next) => {
  console.log(`GET /users request`);
  await User.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOneByEmail = async (req, res, next) => {
  console.log(`GET /users/email/:email request`);
  const email = req.params.email;
  await User.findOneByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOneById = async (req, res, next) => {
  console.log(`GET /users/:id request`);
  const user_id = req.params.user_id;
  await User.findOneById(user_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const add = async (req, res, next) => {
  console.log(`POST /users request`);
  const { name, surname, email, password, formation_id } = req.body;
  if (!name || !surname || !email || !password || !formation_id) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await User.findOneByEmail(email)
    .then(() => {
      res.status(409).send({ error: "User already exists." });
    })
    .catch(() => {
      User.add(name, surname, email, password, formation_id)
        .then((result) => {
          Preference.add(email)
            .then(() => {
              sendMail(email, result.token)
                .then(() => res.respondCreated(null, result.message))
                .catch((error) => next(error));
            })
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    });
};

const update = async (req, res, next) => {
  console.log(`PUT /users/:id request`);
  const email = req.params.email;
  const { name, surname, password, formation_id } = req.body;
  if (!email || !name || !surname || !password || !formation_id) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await User.findOneByEmail(email)
    .then(() => {
      User.update(email, name, surname, password, formation_id)
        .then((result) => res.respondUpdated(null, result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const updateByAdmin = async (req, res, next) => {
  console.log(`PUT /users/:id/admin request`);
  const email = req.params.email;
  const { name, surname, role_id, formation_id } = req.body;
  if (!email || !name || !surname || !role_id || !formation_id) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await User.findOneByEmail(email)
    .then(() => {
      User.updateByAdmin(email, name, surname, role_id, formation_id)
        .then((result) => res.respondUpdated(null, result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const deleteOne = async (req, res, next) => {
  console.log(`DELETE /users/:id request`);
  const user_id = req.params.user_id;

  await User.findOneById(user_id)
    .then((current) => {
      Task.deleteOneByEmail(current.email)
        .then(() => Video.deleteAllVideoLikesByEmail(current.email))
        .then(() => Comment.deleteAllCommentLikesByEmail(current.email))
        .then(() => Favorite.deleteAllByEmail(current.email))
        .then(() => Favorite.deleteAllByEmail(current.email))
        .then(() => Comment.deleteAllByEmail(current.email))
        .then(() => Video.deleteAllByEmail(current.email))
        .then(() => Preference.deleteOne(current.email))
        .then(() => User.deleteOne(current.email))
        .catch((error) => next(error))
        .catch(() => next());
    })
    .catch((error) => next(error))
    .catch(() => next());
};

const sendMail = async (email, token) => {
  await User.sendMail(email, token)
    .then(() => console.log("Mail sent successfully"))
    .catch((e) => console.log(e));
};

const activateUser = async (req, res) => {
  const token = req.params.token;
  const current_user = await User.findOneByToken(token);
  console.log(`Activating user ${current_user.email}`);
  if (isExpired(current_user)) {
    const activation_token = crypto.randomBytes(48).toString("hex");
    await User.newToken(current_user, activation_token).then(() => {
      sendMail(current_user.email, activation_token);
      res.redirect(301, "http://localhost:3000/?toast=Uw activatielink is verlopen, er werd een nieuwe mail verstuurd");
    });
  } else {
    await User.activateUser(token)
      .then(() => {
        res.redirect(301, "http://localhost:3000/?toast=Account geactiveerd, u mag zich nu inloggen");
      })
      .catch(() => res.redirect(301, "http://localhost:3000/?toast=Account activatie gefaald"));
  }
};

const isExpired = (user) => {
  const current_time = new Date();
  const expiration_time = user.token_expiration_date;
  const time_difference = current_time - expiration_time;
  return time_difference > 0;
};

module.exports = {
  findAll,
  findOneByEmail,
  findOneById,
  add,
  update,
  updateByAdmin,
  deleteOne,
  activateUser,
};
