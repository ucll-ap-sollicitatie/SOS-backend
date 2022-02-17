const cors = require('cors')
const helmet = require('helmet')
const responseHelper = require('express-response-helper').helper();
const express = require('express');
const User = require('./services/users')
const Question = require('./services/questions')
const Question_categories = require('./services/question_categories')
const Comment = require('./services/comments')
const Video = require('./services/videos')
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

app.get('/', (req, res) => { 
  res.respond({message: "Slim op sollicitatie API"}) 
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
  const {r_u_number, name, surname, email, password, formation_id, role_id} = req.body
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
app.get('/questions', async (req, res) => {
  let result = await Question.findAll()
  res.respond(result)
})
app.get('/questions/:question_id', async (req, res) => {
  let result = await Question.findOne(req.params.question_id)
  res.respond(result)
})
app.post('/questions', async (req, res) => {
  const {question} = req.body
  let result = await Question.add(question)
  res.respond(result)
})
app.put('/questions/:question_id', async (req, res) => {
  const question_id = req.params.question_id
  const {question} = req.body
  let result = await Question.update(question_id, question)
  res.respond(result)
})
app.delete('/questions/:question_id', async (req, res) => {
  const question_id = req.params.question_id
  let result = await Question.deleteOne(question_id)
  res.respond(result)
})

// CRUD routes for question categories
app.get('/question-categories', async (req, res) => {
  let result = await Question_categories.findAll()
  res.respond(result)
})
app.get('/question-categories/:question_category_id', async (req, res) => {
  let result = await Question_categories.findOneById(req.params.question_category_id)
  res.respond(result)
})
app.get('/question-categories/:category', async (req, res) => {
  const category = req.params.category
  let result = await Question_categories.findOneByName(category)
  res.respond(result)
})
app.post('/question-categories', async (req, res) => {
  const {category} = req.body
  let result = await Question_categories.add(category)
  res.respond(result)
})
app.get('/question-by-category/:question_category_id', async (req, res) => {
  let result = await Question_categories.findAllQuestionsByQuestionCategory(req.params.question_category_id)
  res.respond(result)
})
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

// Log in & Register
app.post('/login', Authentication.logIn)

app.listen(port, () => console.log(`Currently listening on port ${port}`));
