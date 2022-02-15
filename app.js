const express = require('express');
const app = express();
const port = 3001;
const usersService = require('./services/users')
const questionsService = require('./services/questions')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.json({message: "Slim op sollicitatie"})
})

// CRUD routes for users
app.get('/users', usersService.getAllUsers)
app.get('/users/:r_u_nummer', usersService.getUserById)
app.post('/users', usersService.createUser)
app.put('/users/:r_u_nummer', usersService.updateUser)
app.delete('/users/:r_u_nummer', usersService.deleteUser)

// CRUD routes for questions
app.get('/questions', questionsService.getAllQuestions)
app.get('/questions/:vraag_id', questionsService.getQuestionById)
app.post('/questions', questionsService.createQuestion)
app.put('/questions/:vraag_id', questionsService.updateQuestion)
app.delete('/questions/:vraag_id', questionsService.deleteQuestion)

app.listen(port, () => console.log(`Currently listening on port ${port}`))