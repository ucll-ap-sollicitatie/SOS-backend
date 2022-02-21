const Comment = require("../data/comments");

const findAll = async (req, res) => {
  console.log(`GET /comments request`);
  await Comment.findAll()
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const findOne = async (req, res) => {
  console.log(`GET /comments/:id request`);
  const comment_id = req.params.comment_id;
  await Comment.findOne(comment_id)
    .then((result) => res.respond(result))
    .catch((error) => res.failNotFound(error));
};

const add = async (req, res) => {
  console.log(`POST /comments request`);
  const { text, feedback, author, video_id } = req.body;
  await Comment.add(text, feedback, author, video_id)
    .then((result) => res.respondCreated(null, result))
    .catch((error) => res.fail(error));
};

const update = async (req, res) => {
  console.log(`PUT /comments/:id request`);
  const comment_id = req.params.comment_id;
  const { text } = req.body;
  await Comment.update(text, comment_id)
    .then((result) => res.respondUpdated(null, result))
    .catch((error) => res.fail(error));
};

const deleteOne = async (req, res) => {
  console.log(`DELETE /comments/:id request`);
  const comment_id = req.params.comment_id;
  await Comment.deleteOne(comment_id)
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
