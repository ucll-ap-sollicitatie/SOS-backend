const Video = require("../data/videos");

const findAll = async (req, res) => {
  Video.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findAllByEmail = async (req, res) => {
  const { email } = req.params;
  Video.findAllByEmail(email)
    .then((result) => res.respond(result))
    .catch((err) => res.failNotFound(err));
};

const findOne = async (req, res) => {
  const video_id = req.params.video_id;
  await Video.findOne(video_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  const newVideo = req.files.newRecording;
  const { title, r_u_number, email, description } = req.body;
  Video.uploadVideo(newVideo, email)
    .then((result) => {
      Video.add(title, r_u_number, email, description, result.url)
        .then(() => res.respondCreated(null, "Video uploaded."))
        .catch(() => res.fail("Database entry error."));
    })
    .catch(() => {
      res.fail("Video upload error.");
    });
};

const update = async (req, res) => {
  const video_id = req.params.video_id;
  const { title } = req.body;
  Video.update(title, video_id)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => res.fail(error));
};

const deleteOne = async (req, res) => {
  const video_id = req.params.video_id;
  Video.deleteOne(video_id)
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
