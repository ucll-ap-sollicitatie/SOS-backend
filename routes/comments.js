const { Comment } = require("./index");

const findAll = async (req, res, next) => {
  console.log(`GET /comments request`);
  await Comment.findAll()
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findAllByVideo = async (req, res, next) => {
  console.log(`GET /comments/video/video_id`);
  const { video_id } = req.params;
  await Comment.findAllByVideo(video_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findAllFeedbackByVideo = async (req, res, next) => {
  console.log(`GET /comments/video/video_id`);
  const { video_id } = req.params;
  await Comment.findAllFeedbackByVideo(video_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const findOne = async (req, res, next) => {
  console.log(`GET /comments/:id request`);
  const comment_id = req.params.comment_id;
  await Comment.findOne(comment_id)
    .then((result) => res.respond(result))
    .catch((error) => next(error))
    .catch(() => next());
};

const add = async (req, res, next) => {
  console.log(`POST /comments request`);
  console.log(req.body);
  const { text, author, video_id, feedback, start_feedback, end_feedback } = req.body;
  if (!text || !author || !video_id || feedback == null) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  let start_feedback_date, start_feedback_parsed, end_feedback_date, end_feedback_parsed;
  if (!start_feedback || !end_feedback) {
    start_feedback_date = new Date();
    start_feedback_parsed = `00:${start_feedback_date.getMinutes()}:${start_feedback_date.getSeconds()}`;
    end_feedback_date = new Date();
    end_feedback_parsed = `00:${end_feedback_date.getMinutes()}:${end_feedback_date.getSeconds()}`;
  } else {
    start_feedback_date = new Date(start_feedback);
    start_feedback_parsed = `00:${start_feedback_date.getMinutes()}:${start_feedback_date.getSeconds()}`;
    end_feedback_date = new Date(end_feedback);
    end_feedback_parsed = `00:${end_feedback_date.getMinutes()}:${end_feedback_date.getSeconds()}`;
  }
  await Comment.add(text, author, video_id, feedback, start_feedback_parsed, end_feedback_parsed)
    .then((result) => res.respondCreated(result))
    .catch((error) => next(error));
};

const update = async (req, res, next) => {
  console.log(`PUT /comments/:id request`);
  const comment_id = req.params.comment_id;
  const { text } = req.body;
  if (!text) {
    res.status(400).send({ error: "Invalid request or data." });
    return;
  }
  await Comment.findOne(comment_id)
    .then(() => {
      Comment.update(text, comment_id)
        .then((result) => res.respondUpdated(result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const deleteOne = async (req, res, next) => {
  console.log(`DELETE /comments/:id request`);
  const comment_id = req.params.comment_id;
  await Comment.findOne(comment_id)
    .then(() => {
      Comment.deleteOne(comment_id)
        .then((result) => res.respondDeleted(result))
        .catch((error) => next(error));
    })
    .catch(() => res.status(400).send({ error: "Invalid request or data." }));
};

const addLike = async (req, res, next) => {
  console.log(`POST /comments/:comment_id/like`);
  const comment_id = req.params.comment_id;
  const { email } = req.body;
  await Comment.addLike(email, comment_id)
    .then((results) => res.respondCreated(results))
    .catch((error) => next(error))
    .catch(() => next());
};

const removeLike = async (req, res, next) => {
  console.log(`POST /comments/:comment_id/unlike`);
  const comment_id = req.params.comment_id;
  const { email } = req.body;
  await Comment.removeLike(email, comment_id)
    .then((results) => res.respondDeleted(results))
    .catch((error) => next(error))
    .catch(() => next());
};

const checkLike = async (req, res, next) => {
  console.log(`GET /comments/likes`);
  const comment_id = req.params.comment_id;
  const { email } = req.body;
  await Comment.checkLike(comment_id, email)
    .then((results) => res.respond(results))
    .catch((error) => next(error))
    .catch(() => next());
};

module.exports = {
  findAll,
  findAllByVideo,
  findAllFeedbackByVideo,
  findOne,
  add,
  update,
  deleteOne,
  addLike,
  removeLike,
  checkLike,
};
