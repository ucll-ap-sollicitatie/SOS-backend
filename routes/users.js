const User = require("../data/users");
const credentials = require("../configuration/secret");
const frontEnd = "http:/localhost:3000";

const findAll = async (req, res) => {
  User.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneByEmail = async (req, res) => {
  const email = req.params.email;
  User.findOneByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOneById = async (req, res) => {
  const r_u_number = req.params.r_u_number;
  User.findOneById(r_u_number)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  const { r_u_number, name, surname, email, password, role_id, formation_id } =
    req.body;
  User.add(r_u_number, name, surname, email, password, role_id, formation_id)
    .then((result) => {
      sendMail(email, result.token)
        .then(() => res.respondCreated(null, result.message))
        .catch((e) => res.fail(e));
    })
    .catch((error) => res.fail(error));
};

const update = async (req, res) => {
  const email = req.params.email;
  const { r_u_number, name, surname } = req.body;
  User.update(email, r_u_number, name, surname)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => res.fail(error));
};

const deleteOne = async (req, res) => {
  const r_u_number = req.params.r_u_number;
  User.deleteOne(r_u_number)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => res.fail(error));
};

const sendMail = async (email, token) => {
  return new Promise((resolve, reject) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(credentials.transporterConfig.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "slimopsollicitatie2022@gmail.com",
      subject: "SOS - Account activation",
      html: `
        <h3>Welcome to Slim op sollicitatie!</h3>
        <p>Thank you for registering, please click the following link to activate your account.</p>
        <p><a target="_" href="http://localhost:3001/users/activation/${token}">Activate my account!</a></p>
        <p>This link expires after 5 hours. You may always resend a new activation mail.</p>`,
    };

    sgMail
      .send(msg)
      .then(() => resolve("Email sent."))
      .catch((e) => reject(e));
  });
};

const activateUser = async (req, res) => {
  const token = req.params.token;
  const current_user = await User.findOneByToken(token);
  if (isExpired(current_user)) {
    const activation_token = crypto.randomBytes(48).toString("hex");
    await User.newToken(current_user, activation_token).then(() => {
      sendMail(current_user.email, activation_token);
      res.redirect(
        `${frontEnd}/?toast=Uw activatielink is verlopen, er werd een nieuwe mail verstuurd`
      );
    });
  } else {
    User.activateUser(token)
      .then(() => {
        res.redirect(`${frontEnd}/?toast=Account geactiveerd, u mag zich nu inloggen`);
      })
      .catch(() =>
        res.redirect(`${frontEnd}/?toast=Account activatie gefaald`)
      );
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
  deleteOne,
  sendMail,
  activateUser,
};
