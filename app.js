const express = require('express');
const usersService = require('./services/users')
const questionsService = require('./services/questions')
const commentsService = require('./services/comments')
const videosService = require('./services/videos')
const app = express();
const port = 3001;

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    }),
    (req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
        next()
    }
)

app.get('/', (req, res) => {
    res.json({message: "Slim op sollicitatie"})
})

// CRUD routes for users
app.get('/users', usersService.getAllUsers)
app.get('/users/:r_u_number', usersService.getUserById)
app.post('/users', usersService.createUser)
app.put('/users/:r_u_number', usersService.updateUser)
app.delete('/users/:r_u_number', usersService.deleteUser)

// CRUD routes for questions
app.get('/questions', questionsService.getAllQuestions)
app.get('/questions/:question_id', questionsService.getQuestionById)
app.post('/questions', questionsService.createQuestion)
app.put('/questions/:question_id', questionsService.updateQuestion)
app.delete('/questions/:question_id', questionsService.deleteQuestion)

app.get('/questions/categories', questionsService.getAllQuestionCategories)

// CRUD routes for comments
app.get('/comments', commentsService.getAllComments)
app.get('/comments/:comment_id', commentsService.getCommentById)
app.post('/comments', commentsService.createComment)
app.put('/comments/:comment_id', commentsService.updateComment)
app.delete('/comments/:comment_id', commentsService.deleteComment)

// CRUD routes for videos
app.get('/videos', videosService.getAllVideos)
app.get('/videos/:video_id', videosService.getVideoById)
app.post('/videos', videosService.createVideo)
app.put('/videos/:video_id', videosService.updateVideo)
app.delete('/videos/:video_id', videosService.deleteVideo)

app.listen(port, () => console.log(`Currently listening on port ${port}`))