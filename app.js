const express = require('express');
const app = express();
const port = 3001;
const usersService = require('./services/users')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.json({message: "Slim op sollicitatie"})
})

app.get('/users', usersService.getAllUsers)
app.get('/users/:id', usersService.getUserById)
app.post('/users', usersService.createUser)
app.put('/users/:id', usersService.updateUser)
app.delete('/users/:id', usersService.deleteUser)

app.listen(port, () => console.log(`Currently listening on port ${port}`))