require("dotenv").config();
const { User, Preference, Task, Comment, Favorite, Video, crypto } = require("./index");

/**
 * [GET] Handles result of query for finding all users.
 */
const findAll = async (req, res, next) => {
  console.log(`GET /users request`);
  await User.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [PUT] Handles result of query for finding one user by email.
 */
const findOneByEmail = async (req, res, next) => {
  console.log(`GET /users/email/:email request`);
  const email = req.params.email;
  await User.findOneByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [PUT] Handles result of query for finding one user by id.
 */
const findOneById = async (req, res, next) => {
  console.log(`GET /users/:id request`);
  const user_id = req.params.user_id;
  await User.findOneById(user_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [POST] Handles result of query for adding one user by id.
 * * Adds preferences for new user.
 * * Sends account activation email [1 hour expiration]
 * * 409 - User already exists
 * * 201 - User created
 */
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
              sendActivationMail(email, result.token)
                .then(() => res.respondCreated(null, result.message))
                .catch((error) => next(error));
            })
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    });
};

/**
 * [PUT] Handles result of query for updating a user by id.
 */
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

/**
 * [PUT] Handles result of query for updating a user by id as admin.
 * * As admin = adjustment of user's role.
 */
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

/**
 * [DELETE] Handles result of query for deleting a user.
 * * Deletes all users' tasks
 * * Deletes all users' comment likes
 * * Deletes all users' video likes
 * * Deletes all users' favorites
 * * Deletes all users' comments
 * * Deletes all users' videos
 * * Deletes all users' preferences
 * * Deletes user
 */
const deleteOne = async (req, res, next) => {
  console.log(`DELETE /users/:id request`);
  const user_id = req.params.user_id;

  await User.findOneById(user_id)
    .then((current) => {
      Task.deleteOneByEmail(current.email)
        .then(() => Video.deleteAllVideoLikesByEmail(current.email))
        .then(() => Comment.deleteAllCommentLikesByEmail(current.email))
        .then(() => Favorite.deleteAllByEmail(current.email))
        .then(() => Comment.deleteAllByEmail(current.email))
        .then(() => Video.deleteAllByEmail(current.email))
        .then(() => Preference.deleteOne(current.email))
        .then(() => User.deleteOne(current.user_id))
        .then((result) => res.respondDeleted(null, result))
        .catch((error) => next(error))
        .catch(() => next());
    })
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * Sends activation email to new user.
 */
const sendActivationMail = async (email, token) => {
  await User.sendActivationMail(email, token)
    .then(() => console.log("Activation mail sent successfully"))
    .catch((e) => console.log(e));
};

/**
 * Handles result of query for activating a user.
 * * Fails if expired, resends new email.
 */
const activateUser = async (req, res) => {
  const token = req.params.token;
  const current_user = await User.findOneByToken(token);
  console.log(`Activating user ${current_user.email}`);
  if (isExpired(current_user)) {
    const activation_token = crypto.randomBytes(48).toString("hex");
    await User.newToken(current_user, activation_token).then(() => {
      sendActivationMail(current_user.email, activation_token);
      res.redirect(301, `${process.env.FRONTEND_URL}/?toast=Uw activatielink is verlopen, er werd een nieuwe mail verstuurd`);
    });
  } else {
    await User.activateUser(token)
      .then(() => {
        res.redirect(301, `${process.env.FRONTEND_URL}/?toast=Account geactiveerd, u mag zich nu inloggen`);
      })
      .catch(() => res.redirect(301, `${process.env.FRONTEND_URL}/?toast=Account activatie gefaald`));
  }
};

/**
 * Handles result of query for activating a user by admin.
 * * By admin = forcefully, without the user's input.
 */
const activateUserByAdmin = async (req, res, next) => {
  console.log("PUT /users/activation/:user_id/admin");
  const user_id = req.params.user_id;
  await User.findOneById(user_id)
    .then((current) => {
      User.activateUserByAdmin(current)
        .then((result) => res.respondUpdated(null, result))
        .catch((error) => next(error));
    })
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * Checks if user's activation token has expired.
 * @param {User} user
 * @returns true if expired, false if still valid.
 */
const isExpired = (user) => {
  const current_time = new Date();
  const expiration_time = user.token_expiration_date;
  const time_difference = current_time - expiration_time;
  return time_difference > 0;
};

/**
 * [PUT] Handles result of query for uploading a new image for a user.
 */
const uploadImage = async (req, res, next) => {
  console.log(`PUT /users/:user_id/image`);
  const newImage = req.files.newImage;
  newImage.name = newImage.name.split(".")[0];
  const user_id = req.params.user_id;

  await User.uploadImage(newImage, user_id)
    .then((result) => {
      User.uploadImageQuery(user_id, result.url).then(() => res.respondUpdated(null, "Image uploaded."));
    })
    .catch((e) => next(e));
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
  activateUserByAdmin,
  uploadImage,
};
