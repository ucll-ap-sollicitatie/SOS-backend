const User = require("../routes/users");
const Role = require("../routes/roles");
const Question = require("../routes/questions");
const Question_categories = require("../routes/question_categories");
const Comment = require("../routes/comments");
const Video = require("../routes/videos");
const Formation = require("../routes/formations");
const Preference = require("../routes/preferences");
const Authentication = require("../routes/authentication");
const Task = require("../routes/tasks");
const Favorite = require("../routes/favorites");

module.exports = {
  User,
  Role,
  Question,
  Question_categories,
  Comment,
  Video,
  Formation,
  Preference,
  Authentication,
  Task,
  Favorite,
};
