// Routing imports
const Index = require("./routes/index");
const User = require("./routes/users");
const Role = require("./routes/roles");
const Question = require("./routes/questions");
const Question_categories = require("./routes/question_categories");
const Comment = require("./routes/comments");
const Video = require("./routes/videos");
const Formation = require("./routes/formations");
const Authentication = require("./routes/authentication");

// Middleware
const cors = require("cors");
const helmet = require("helmet");
const responseHelper = require("express-response-helper").helper();
const fileUpload = require("express-fileupload");
const compression = require("compression");

// Application
const express = require("express");
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

app.get("/", Index.welcome);

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

// Routes for categories
app.get("/question-categories", Question_categories.findAll);
app.get("/question-categories/:question_category_id", Question_categories.findOneById);
app.get("/question-categories/category/:category", Question_categories.findOneByCategory);
app.post("/question-categories", Question_categories.add);

// Routes for formations
app.get("/formations", Formation.findAll);
app.get("/formations/:formation_id", Formation.findOneById);
app.get("/formations/name/:formation_name", Formation.findOneByName);

// Routes for comments
app.get("/comments", Comment.findAll);
app.get("/comments/:comment_id", Comment.findOne);
app.post("/comments", Comment.add);
app.put("/comments/:comment_id", Comment.update);
app.delete("/comments/:comment_id", Comment.deleteOne);

// Routes for videos
app.get("/videos", Video.findAll);
app.get("/videos/:video_id", Video.findOne);
app.post("/videos", Video.add);
app.put("/videos/:video_id", Video.update);
app.delete("/videos/:video_id", Video.deleteOne);

// Route for roles
app.get("/roles", Role.findAll);

// Log in & Register
app.post("/auth/login", Authentication.logIn);

// Invalid URL handler
app.use(Index.invalidUrl);

app.listen(port, () => console.log(`SOS back-end running on ${serverUrl}${port}`));
