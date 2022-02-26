// Routing imports
const User = require("./routes/users");
const Role = require("./routes/roles");
const Question = require("./routes/questions");
const Question_categories = require("./routes/question_categories");
const Comment = require("./routes/comments");
const Video = require("./routes/videos");
const Formation = require("./routes/formations");
const Preference = require("./routes/preferences");
const Authentication = require("./routes/authentication");

// Middleware
const cors = require("cors");
const helmet = require("helmet");
const responseHelper = require("express-response-helper").helper();
const fileUpload = require("express-fileupload");
const compression = require("compression");

// Application
const express = require("express");
const e = require("cors");
const app = express();
const port = 3001;
const serverUrl = "http://localhost:";
const corsOptions = { origin: `${serverUrl}3000` };

app.use(compression());
app.use(fileUpload({ useTempFiles: true }));
app.use(responseHelper);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.respond({ message: "Slim op sollicitatie API" });
});

// Routes for users
app.get("/users", User.findAll);
app.get("/users/:r_u_number", User.findOneById);
app.get("/users/email/:email", User.findOneByEmail);
app.post("/users", User.add);
app.put("/users/:email", User.update);
app.delete("/users/:r_u_number", User.deleteOne);
app.get("/users/activation/:token", User.activateUser);

// Routes for questions
app.get("/questions", Question.findAll);
app.get("/questions/:question_id", Question.findOne);
app.post("/questions", Question.add);
app.put("/questions/:question_id", Question.update);
app.delete("/questions/:question_id", Question.deleteOne);
app.get("/questions/category/:question_category_id", Question.findAllQuestionsByQuestionCategory);
app.get("/questions/random/random", Question.findRandomQuestions);

// Routes for categories
app.get("/question-categories", Question_categories.findAll);
app.get("/question-categories/:question_category_id", Question_categories.findOneById);
app.get("/question-categories/category/:category", Question_categories.findOneByCategory);
app.post("/question-categories", Question_categories.add);
app.put("/question-categories/:question_category_id", Question_categories.update);
app.delete("/question-categories/:question_category_id", Question_categories.deleteOne);

// Routes for formations
app.get("/formations", Formation.findAll);
app.get("/formations/:formation_id", Formation.findOneById);
app.get("/formations/name/:formation_name", Formation.findOneByName);

// Routes for preferences
app.get("/preferences", Preference.findAll);
app.get("/preferences/:preference_id", Preference.findOneById);
app.get("/preferences/r_u_number/:preference_r_u_number", Preference.findOneByRUNumber);
app.post("/preferences", Preference.add);
app.delete("/preferences/r_u_number/:r_u_number", Preference.deleteOne);

// Routes for comments
app.get("/comments", Comment.findAll);
app.get("/comments/:comment_id", Comment.findOne);
app.post("/comments", Comment.add);
app.put("/comments/:comment_id", Comment.update);
app.delete("/comments/:comment_id", Comment.deleteOne);
app.get("/comments/video/:video_id", Comment.findAllByVideo);
app.get("/comments/video/:video_id/feedback", Comment.findAllFeedbackByVideo);
app.post("/comments/:comment_id/like", Comment.addLike);
app.get("/comments/likes", Comment.checkLike);

// Routes for videos
app.get("/videos", Video.findAll);
app.get("/videos/:video_id", Video.findOne);
app.get("/videos/email/:email", Video.findAllByEmail);
app.get("/videos/email/:email/public", Video.findAllPublicByEmail);
app.post("/videos", Video.add);
app.put("/videos/:video_id", Video.update);
app.delete("/videos/:video_id", Video.deleteOne);

// Route for roles
app.get("/roles", Role.findAll);

// Log in & Register
app.post("/auth/login", Authentication.logIn);

// 404
app.use(function (req, res, next) {
  return res.status(404).send({ message: "Resource " + req.url + " Not found." });
});

// 500 - Any server error
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV == "development") {
    console.log(err);
  }
  return res.status(500).send({ error: err });
});

if (process.env.NODE_ENV == "production") {
  app.listen(port, () => console.log(`SOS back-end running on ${serverUrl}${port} [PRODUCTION]`));
} else {
  app.listen(port, () => console.log(`SOS back-end running on ${serverUrl}${port} [DEVELOPMENT]`));
}
