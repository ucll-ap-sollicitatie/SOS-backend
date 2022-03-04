const { Favorite }=  require("./index");

const addFavorite = async (req, res, next) => {
    console.log(`POST /favorites/:video_id/favorite`);
    const video_id = req.params.video_id;
    const { email } = req.body;
    await Favorite.addFavorite(email, video_id)
      .then((results) => res.respondCreated(results))
      .catch((error) => next(error))
      .catch(() => next());
};

const findAllFavoritedVideosByEmail = async (req, res, next) => {
    console.log(`GET /favorites/email/:email request`);
    const email = req.params.email;
    await Favorite.findAllFavoritedVideosByEmail(email)
      .then((result) => res.respond(result))
      .catch((error) => next(error))
      .catch(() => next());
};

const findAllFavoritedVideos = async (req, res, next) => {
    console.log(`GET /favorites request`);
    await Favorite.findAllFavoritedVideos()
      .then((result) => res.respond(result))
      .catch((error) => next(error))
      .catch(() => next());
};

const removeFavorite = async (req, res, next) => {
    console.log(`POST /favorites/:video_id/unfavorite`);
    const video_id = req.params.video_id;
    const { email } = req.body;
    await Favorite.removeFavorite(email, video_id)
      .then((results) => res.respondDeleted(results))
      .catch((error) => next(error))
      .catch(() => next());
};

const checkVideoFavorite = async (req, res, next) => {
  console.log(`POST /favorites/:video_id/check`);
  const video_id = req.params.video_id;
  const { email } = req.body;
  await Favorite.checkVideoFavorite(email, video_id)
    .then((results) => res.respond(results))
    .catch((error) => next(error))
    .catch(() => next());
};

const getRandomFavoritedVideos = async (req, res, next) => {
  console.log(`GET /favorites/random/random request`);
  await Favorite.getRandomFavoritedVideos()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

module.exports = {
    addFavorite,
    findAllFavoritedVideos,
    findAllFavoritedVideosByEmail,
    removeFavorite,
    checkVideoFavorite,
    getRandomFavoritedVideos,
};