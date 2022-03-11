const sgMail = require("@sendgrid/mail");
const FROM = "slimopsollicitatie2022@gmail.com";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendFeedbackEmail = (userEmail, video_id) => {
  return new Promise((resolve, reject) => {
    const msg = {
      to: userEmail,
      from: FROM,
      subject: "SOS - Nieuwe feedback",
      html: `
          <h3>Nieuwe feedback op Slim op sollicitatie!</h3>
          <p>Beste, u heeft zojuist nieuwe feedback gekregen op een van uw video's. Klik op volgende link om de feedback te bekijken.</p>
          <p><a target="_" href="${process.env.FRONTEND_URL}/videos/${video_id}">Bekijk feedback</a></p>
          `,
    };

    tryEmail(resolve, reject, msg);
  });
};

const sendNewTaskToStudentsEmail = (userEmail) => {
  return new Promise((resolve, reject) => {
    const msg = {
      to: userEmail,
      from: FROM,
      subject: "SOS - Nieuwe taak",
      html: `
          <h3>Nieuwe taak op Slim op sollicitatie!</h3>
          <p>Beste, u heeft zojuist een nieuwe taak gekregen. Klik op volgende link om de taak te bekijken.</p>
          <p><a target="_" href="${process.env.FRONTEND_URL}/tasks">Bekijk taak</a></p>
          `,
    };

    tryEmail(resolve, reject, msg);
  });
};

const sendActivationMail = (email, token) => {
  return new Promise((resolve, reject) => {
    const msg = {
      to: email,
      from: FROM,
      subject: "SOS - Account activation",
      html: `
          <h3>Van harte welkom bij Slim op sollicitatie!</h3>
          <p>Gelieve op de volgende link te drukken om uw account te activeren.</p>
          <p><a target="_" href="${process.env.BACKEND_URL}/users/activation/${token}">Activeer mijn account</a></p>
          <p>Deze link verloopt na 1 uur vanaf de tijd van registratie, om een nieuwe activatielink te krijgen kan u na de verlopen tijd op de bovenstaande link drukken.</p>`,
    };

    tryEmail(resolve, reject, msg);
  });
};

const tryEmail = (resolve, reject, msg) => {
  sgMail
    .send(msg)
    .then(() => resolve("Email sent."))
    .catch((e) => reject(e));
};

module.exports = {
  sendFeedbackEmail,
  sendNewTaskToStudentsEmail,
  sendActivationMail,
};
