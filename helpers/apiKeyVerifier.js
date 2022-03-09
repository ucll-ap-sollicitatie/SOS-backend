require("dotenv").config();
const crypto = require("crypto");

const verifyApiKey = (req, res, next) => {
  const givenApiKey = req.headers["x-api-key"];

  if (req.hostname === process.env.API_ALLOW_HOST) {
    next();
    return;
  }
  if (!givenApiKey) {
    res.status(401).send("Please provide a correct 'x-api-key' header to gain access.");
    return;
  }
  const hash = crypto.createHash("sha512");
  if (crypto.timingSafeEqual(hash.copy().update(givenApiKey).digest(), hash.copy().update(process.env.API_KEY).digest())) {
    next();
  } else {
    res.status(401).send("Unauthorized api-key.");
  }
};

module.exports = {
  verifyApiKey,
};
