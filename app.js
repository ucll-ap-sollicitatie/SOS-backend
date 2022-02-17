const cors = require('cors')
const helmet = require('helmet')
const responseHelper = require('express-response-helper').helper();
const express = require('express');
const User = require('./services/users')
const Question = require('./services/questions')
const Question_categories = require('./services/question_categories')
const Comment = require('./services/comments')
const Video = require('./services/videos')
const Formations = require("./services/formations");
const Roles = require("./services/roles");
const Authentication = require('./services/authentication')

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(responseHelper)
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// }

app.get('/', (req, res) => {
  res.respond({ message: "Slim op sollicitatie API" })
})

// CRUD routes for users
app.get('/users', async (req, res) => {
  let result = await User.findAll()
  res.respond(result)
})

app.get('/users/:r_u_number', async (req, res) => {
  let result = await User.findOne(req.params.r_u_number)
  res.respond(result)
})
app.post('/users', async (req, res) => {
  const { r_u_number, name, surname, email, password, formation_id, role_id } = req.body
  let result = await User.add(r_u_number, name, surname, email, password, formation_id, role_id)
  res.respond(result)
})
// app.put('/users/:r_u_number', (req, res) => {
//   res.status(200).json(User.update(req, res))
// })
app.delete('/users/:r_u_number', async (req, res) => {
  let result = await User.deleteOne(req.params.r_u_number)
  res.respond(result)
})

// CRUD routes for questions
app.get('/questions', Question.getAllQuestions)
app.get('/questions-by-category/:question_category_id', Question.getAllQuestionsByQuestionCategoryId)
app.get('/questions/:question_id', Question.getQuestionById)
app.post('/questions', Question.createQuestion)
app.put('/questions/:question_id', Question.updateQuestion)
app.delete('/questions/:question_id', Question.deleteQuestion)

// CRUD routes for question categories
app.get('/question-categories', Question_categories.getAllQuestionCategories)
app.get('/question-categories/:question_category_id', Question_categories.getQuestionCategoriesById)
app.get('/question-categories/:category', Question_categories.getQuestionCategoriesByName)
app.post('/question-categories', Question_categories.createQuestionCategory)

// CRUD routes for comments
app.get('/comments', Comment.getAllComments)
app.get('/comments/:comment_id', Comment.getCommentById)
app.post('/comments', Comment.createComment)
app.put('/comments/:comment_id', Comment.updateComment)
app.delete('/comments/:comment_id', Comment.deleteComment)

// CRUD routes for videos
app.get('/videos', Video.getAllVideos)
app.get('/videos/:video_id', Video.getVideoById)
app.post('/videos', Video.createVideo)
app.put('/videos/:video_id', Video.updateVideo)
app.delete('/videos/:video_id', Video.deleteVideo)

// CRUD routes for roles
app.get("/roles", rolesService.getAllRoles);

// CRUD routes for formations
app.get("/formations", formationsService.getAllFormations);
app.get("/formations/:formation_id", formationsService.getFormationById);
app.get("/formations-by-name/:formation", formationsService.getFormationByName);

// Log in & Register
app.post('/login', Authentication.logIn)

app.listen(port, () => console.log(`Currently listening on port ${port}`));
