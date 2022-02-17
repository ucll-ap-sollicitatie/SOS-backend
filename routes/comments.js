const Comment = require("../data/comments");

const findAll = async (req, res) => {
  console.info(`HTTP request to find all comments.`);
  Comment.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOne = async (req, res, next) => {
  const comment_id = req.params.comment_id;
  console.info(`HTTP request to find one comment #${comment_id}`);
  Comment.findOne(comment_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  const { text, feedback, author, video_id } = req.body;
  console.info(
    `HTTP request to add comment [text:${text}, feedback:${feedback}, author:${author}, video_id:${video_id}]`
  );
  Comment.add(text, feedback, author, video_id)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => res.fail(error));
};

const update = async (req, res) => {
  const comment_id = req.params.comment_id;
  const { text } = req.body;
  console.info(
    `HTTP request to update comment ${comment_id} with text: ${text}`
  );
  Comment.update(text, comment_id)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => res.fail(error));
};

const deleteOne = async (req, res) => {
  const comment_id = req.params.comment_id;
  console.info(`HTTP request to delete one comment ${comment_id}`);
  Comment.deleteOne(comment_id)
    .then((result) => res.respondDeleted(null, result))
    .catch((error) => res.fail(error));
};

module.exports = {
  findAll,
  findOne,
  add,
  update,
  deleteOne,
};
