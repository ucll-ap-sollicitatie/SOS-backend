const { Video, Comment, Favorite } = require("./index");

/**
 * [GET] Handles result of query for finding all videos.
 */
const findAll = async (req, res, next) => {
  console.log(`GET /videos request`);
  await Video.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for finding all videos by email.
 */
const findAllByEmail = async (req, res, next) => {
  console.log(`GET /videos/email/:email request`);
  const email = req.params.email;
  await Video.findAllByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for finding all public videos by email.
 */
const findAllPublicByEmail = async (req, res, next) => {
  console.log(`GET /videos/email/:email/public request`);
  const email = req.params.email;
  await Video.findAllPublicByEmail(email)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for finding one video by id.
 */
const findOne = async (req, res, next) => {
  console.log(`GET /videos/:id request`);
  const video_id = req.params.video_id;
  await Video.findOne(video_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [POST] Handles result of query for adding a video.
 * * Uploads video to cloudinary
 * * Uploads subtitles to cloudinary
 * * Adds video to database
 */
const add = async (req, res, next) => {
  console.log(`POST /videos request`);
  const newVideo = req.files.newRecording;
  const { title, user_id, email, description, private, subtitles } = req.body;
  if (!title || !user_id || !email) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }

  await Video.findOneByEmailAndTitle(email, title)
    .then(() => res.status(409).send({ error: "Video with this title for user " + user_id + " already exists." }))
    .catch(() => {
      Video.uploadVideo(newVideo, user_id)
        .then((result) => {
          Video.uploadSubtitles(subtitles, newVideo, user_id)
            .then(() => {
              Video.add(title, user_id, email, description, result.secure_url, private)
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
    });
};

/**
 * [PUT] Handles result of query for updating a video.
 */
const update = async (req, res, next) => {
  console.log(`PUT /videos/:id request`);
  const video_id = req.params.video_id;
  const { new_title, description, private, old_title, user_id } = req.body;
  if (!new_title || !description || !old_title || !user_id) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Video.findOne(video_id)
    .then(() => {
      if (old_title === new_title) {
        Video.update(new_title, description, private, video_id).then((result) => res.respondUpdated(null, result));
      } else {
        Video.updateCloudinary(old_title, new_title, user_id)
          .then(() => {
            Video.updateSubtitles(old_title, new_title, user_id);
            Video.update(new_title, description, private, video_id).then((result) => res.respondUpdated(null, result));
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error))
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

/**
 * [DELETE] Handles result of query for deleting a video.
 * * Deletes video from cloudinary
 * * Deletes all video's subtitles
 * * Deletes all video's comment likes
 * * Deletes all video's video likes
 * * Deletes all video's coments
 * * Deletes all video's favorites
 * * Deletes video
 */
const deleteOne = async (req, res, next) => {
  console.log(`DELETE /videos/:id request`);
  const video_id = req.params.video_id;
  await Video.findOne(video_id)
    .then((current) => {
      Video.deleteCloudinary(current.title, current.user_id)
        .then(() => Video.deleteSubtitles(current.title, current.user_id))
        .then(() => Comment.deleteAllCommentLikesByVideo(video_id))
        .then(() => Comment.deleteAllByVideo(video_id))
        .then(() => Favorite.deleteAllByVideo(video_id))
        .then(() => Video.deleteAllVideoLikesByVideo(video_id))
        .then(() => Video.deleteVideo(video_id))
        .then((result) => res.respondDeleted(null, result))
        .catch((error) => next(error))
        .catch(() => next());
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

/**
 * [POST] Handles result of query for liking a video with user email.
 */
const likeVideo = async (req, res, next) => {
  console.log(`POST /videos/:video_id/like`);
  const video_id = req.params.video_id;
  const { email } = req.body;
  await Video.likeVideo(email, video_id)
    .then((results) => res.respondCreated(results))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [POST] Handles result of query for unliking a video with user email.
 */
const unlikeVideo = async (req, res, next) => {
  console.log(`POST /videos/:video_id/unlike`);
  const video_id = req.params.video_id;
  const { email } = req.body;
  await Video.unlikeVideo(email, video_id)
    .then((results) => res.respondDeleted(results))
    .catch((error) => next(error))
    .catch(() => next());
};

/**
 * [GET] Handles result of query for checking if user by email has already liked a video.
 */
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
