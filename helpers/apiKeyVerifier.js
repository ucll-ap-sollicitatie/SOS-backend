const crypto = require("crypto");

const verifyApiKey = (req, res, next) => {
  const givenApiKey = req.headers["X-API-KEY"];
  if (req.hostname === "api.szymon-nidecki.sb.uclllabs.be") next();
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
