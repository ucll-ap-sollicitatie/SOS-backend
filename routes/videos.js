const Video = require("../data/videos");
const thumbsupply = require('thumbsupply');

const findAll = async (req, res) => {
  Video.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOne = async (req, res) => {
  const video_id = req.params.video_id;
  await Video.findOne(video_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  const { title, r_u_number } = req.body;
  Video.add(title, r_u_number)
    .then(() => {
      const newVideo = req.files.newRecording;
      Video.uploadVideo(newVideo)
        .then(() => res.respondCreated(null, "Video uploaded."))
        .catch((e) => res.fail(e));
    })
    .catch((e) => {
      res.fail(e);
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

const thumbnail = async (req, res) => {
  const video_id = req.params.video_id;
  await Video.findOne(video_id)
    .then((result) => {console.log(`${result.video_url}`);
                       thumbsupply.generateThumbnail(result.video_url)
                       .then(thumb => { console.log(thumb);
                         res.sendFile(thumb)})})
                       .catch(() => "thumbgeneration error")
    .catch((error) => res.failNotFound(error));
}

module.exports = {
  findAll,
  findOne,
  add,
  update,
  deleteOne,
  thumbnail,
};
