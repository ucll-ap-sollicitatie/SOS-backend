const Video = require("../data/videos");

const findAll = async (req, res) => {
  console.log(`GET /videos request`);
  await Video.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findAllByEmail = async (req, res) => {
  console.log(`GET /videos/email/:email request`);
  const { email } = req.params;
  await Video.findAllByEmail(email)
    .then((result) => res.respond(result))
    .catch((err) => res.failNotFound(err));
};

const findOne = async (req, res) => {
  console.log(`GET /videos/:id request`);
  const video_id = req.params.video_id;
  await Video.findOne(video_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  console.log(`POST /videos request`);
  const newVideo = req.files.newRecording;
  const { title, r_u_number, email, description, private } = req.body;
  await Video.uploadVideo(newVideo, email)
    .then((result) => {
      Video.add(title, r_u_number, email, description, result.url, private)
        .then(() => res.respondCreated(null, "Video uploaded."))
        .catch(() => res.fail("Database entry error."));
    })
    .catch((e) => {
      res.fail(e);
    });
};

const update = async (req, res) => {
  console.log(`PUT /videos/:id request`);
  const video_id = req.params.video_id;
  const { title } = req.body;
  await Video.update(title, video_id)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => res.fail(error));
};

const deleteOne = async (req, res) => {
  console.log(`DELETE /videos/:id request`);
  const video_id = req.params.video_id;
  await Video.deleteOne(video_id)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => res.fail(error));
};

module.exports = {
  findAll,
  findAllByEmail,
  findOne,
  add,
  update,
  deleteOne,
};
