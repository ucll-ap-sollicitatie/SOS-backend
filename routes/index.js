const welcome = async (req, res) => {
  res.respond({ message: "Slim op sollicitatie API" });
};

const invalidUrl = (req, res, next) => {
  res.failNotFound("Invalid url.");
};

module.exports = {
  welcome,
  invalidUrl,
};
