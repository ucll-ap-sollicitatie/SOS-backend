const { Video } = require("./index");

const findAll = async (req, res, next) => {
  console.log(`GET /videos request`);
  await Video.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findAllByEmail = async (req, res, next) => {
  console.log(`GET /videos/email/:email request`);
  const email = req.params.email;
  await Video.findAllByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findAllPublicByEmail = async (req, res, next) => {
  console.log(`GET /videos/email/:email/public request`);
  const email = req.params.email;
  await Video.findAllPublicByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOne = async (req, res, next) => {
  console.log(`GET /videos/:id request`);
  const video_id = req.params.video_id;
  await Video.findOne(video_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const add = async (req, res, next) => {
  console.log(`POST /videos request`);
  const newVideo = req.files.newRecording;
  const { title, r_u_number, email, description, private, subtitles } = req.body;
  if (!title || !r_u_number || !email) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }

  await Video.uploadVideo(newVideo, email)
    .then((result) => {
      Video.uploadSubtitles(subtitles, newVideo, email)
        .then(() => {
          Video.add(title, r_u_number, email, description, result.url, private)
            .then(() => res.respondCreated(null, "Video uploaded."))
            .catch((e) => next(e));
        })
        .catch((e) => {
          next(e);
        });
    })
    .catch((e) => {
      next(e);
    });
};

const update = async (req, res, next) => {
  console.log(`PUT /videos/:id request`);
  const video_id = req.params.video_id;
  const { title } = req.body;
  if (!title) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Video.findOne(video_id)
    .then(() => {
      Video.update(title, video_id)
        .then((result) => res.respondUpdated(null, result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const deleteOne = async (req, res, next) => {
  console.log(`DELETE /videos/:id request`);
  const video_id = req.params.video_id;
  await Video.findOne(video_id)
    .then(() => {
      Video.deleteOne(video_id)
        .then((result) => res.respondDeleted(null, result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const likeVideo = async (req, res, next) => {
  console.log(`POST /videos/:video_id/like`);
  const video_id = req.params.video_id;
  const { email } = req.body;
  await Video.likeVideo(email, video_id)
    .then((results) => res.respondCreated(results))
    .catch((error) => next(error))
    .catch(() => next());
};

const unlikeVideo = async (req, res, next) => {
  console.log(`POST /videos/:video_id/unlike`);
  const video_id = req.params.video_id;
  const { email } = req.body;
  await Video.unlikeVideo(email, video_id)
    .then((results) => res.respondDeleted(results))
    .catch((error) => next(error))
    .catch(() => next());
};

const checkVideoLike = async (req, res, next) => {
  console.log(`GET /videos/likes`);
  const video_id = req.params.video_id;
  const { email } = req.body;
  await Video.checkVideoLike(video_id, email)
    .then((results) => res.respond(results))
    .catch((error) => next(error))
    .catch(() => next());
};

module.exports = {
  findAll,
  findAllByEmail,
  findAllPublicByEmail,
  findOne,
  add,
  update,
  deleteOne,
  likeVideo,
  unlikeVideo,
  checkVideoLike,
};
