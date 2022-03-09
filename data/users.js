// Contains all the queries for the table 'users'
const { db, bcrypt, crypto, queryHelpers, cloudinary } = require("./index");
const saltRounds = 10;

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT user_id, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date, last_login, introduced, edited FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) INNER JOIN preferences using(email) ORDER BY user_id DESC",
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findAllByRole = (role_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT user_id, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date, last_login, introduced, edited FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) INNER JOIN preferences using(email) WHERE role_id = $1 ORDER BY user_id DESC",
      [role_id],
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT user_id, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date, last_login, introduced, edited FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) INNER JOIN preferences using(email) WHERE email = $1",
      [email],
      (err, results) => {
        queryHelpers.handleQueryOne(resolve, reject, err, results);
      }
    );
  });
};

const findOneById = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT user_id, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date, last_login, introduced, edited FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) INNER JOIN preferences using(email) WHERE user_id = $1",
      [user_id],
      (err, results) => {
        queryHelpers.handleQueryOne(resolve, reject, err, results);
      }
    );
  });
};

const findOneByToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT user_id, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date, last_login, introduced, edited FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) INNER JOIN preferences using(email) WHERE activation_token = $1",
      [token],
      (err, results) => {
        queryHelpers.handleQueryOne(resolve, reject, err, results);
      }
    );
  });
};

const add = (name, surname, email, password, formation_id) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (hash_err, hash) => {
      if (hash_err) reject(hash_err);
      const activation_token = crypto.randomBytes(48).toString("hex");
      db.query(
        "INSERT INTO users (name, surname, email, hashed_password, formation_id, activation_token) VALUES ($1, $2, $3, $4, $5, $6)",
        [name, surname, email, hash, formation_id, activation_token],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve({ message: "User added.", token: activation_token });
        }
      );
    });
  });
};

const update = (email, name, surname, password, formation_id) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (hash_err, hash) => {
      if (hash_err) reject(hash_err);
      db.query(
        "UPDATE users SET email = $1, name = $2, surname = $3, hashed_password = $4, formation_id = $5 WHERE email = $1 RETURNING email",
        [email, name, surname, hash, formation_id],
        (err, results) => {
          queryHelpers.handleQueryUpdate(resolve, reject, err, "User");
        }
      );
    });
  });
};

const updateByAdmin = (email, name, surname, role_id, formation_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET email = $1, name = $2, surname = $3, formation_id = $4, role_id = $5 WHERE email = $1 RETURNING email",
      [email, name, surname, formation_id, role_id],
      (err, results) => {
        queryHelpers.handleQueryUpdate(resolve, reject, err, "User");
      }
    );
  });
};

const deleteOne = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE user_id = $1`, [user_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "User");
    });
  });
};

const activateUser = (token) => {
  return new Promise((resolve, reject) => {
    findOneByToken(token)
      .then(() => {
        db.query(
          "UPDATE users SET activation_token = null, token_expiration_date = null WHERE activation_token = $1 RETURNING email",
          [token],
          (err, results) => {
            if (err) {
              reject(err);
              return;
            }
            resolve("User activated.");
          }
        );
      })
      .catch((err) => reject(err));
  });
};

const activateUserByAdmin = (user) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET activation_token = null, token_expiration_date = null WHERE user_id = $1",
      [user.user_id],
      (err, results) => {
        queryHelpers.handleQueryUpdate(resolve, reject, err, "User activation");
      }
    );
  });
};

const newToken = (current_user, activation_token) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET activation_token = $1, token_expiration_date = (now() + '01:00:00'::interval) WHERE email = $2 RETURNING email",
      [activation_token, current_user.email],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve("New token provided.");
      }
    );
  });
};

const sendActivationMail = (email, token) => {
  return new Promise((resolve, reject) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "slimopsollicitatie2022@gmail.com",
      subject: "SOS - Account activation",
      html: `
        <h3>Van harte welkom bij Slim op sollicitatie!</h3>
        <p>Gelieve op de volgende link te drukken om uw account te activeren.</p>
        <p><a target="_" href="${process.env.BACKEND_URL}/users/activation/${token}">Activeer mijn account</a></p>
        <p>Deze link verloopt na 1 uur vanaf de tijd van registratie, om een nieuwe activatielink te krijgen kan u na de verlopen tijd op de bovenstaande link drukken.</p>`,
    };

    sgMail
      .send(msg)
      .then(() => resolve("Email sent."))
      .catch((e) => reject(e));
  });
};

const uploadImage = (image_file, user_id) => {
  return cloudinary.v2.uploader.upload(image_file.tempFilePath, {
    resource_type: "auto",
    public_id: `SOS_image/${user_id}/${image_file.name}`,
  });
};

const uploadImageQuery = (user_id, newUrl) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE users set image = $1 WHERE user_id = $2", [newUrl, user_id], (err, results) => {
      queryHelpers.handleQueryUpdate(resolve, reject, err, "Image for user");
    });
  });
};

module.exports = {
  findAll,
  findAllByRole,
  findOneByEmail,
  findOneById,
  findOneByToken,
  add,
  update,
  updateByAdmin,
  deleteOne,
  activateUser,
  activateUserByAdmin,
  newToken,
  sendActivationMail,
  uploadImage,
  uploadImageQuery,
};
