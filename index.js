const express = require('express') //<== to import express framework in node.js
const typeorm = require('typeorm') //<== to use typeorm for databe

const app = express() //<== to use express framework
app.use(express.json()) //<== to handle  node.js and read type JSON format

//create connection to sqlite database
typeorm.createConnection({
    type: "sqlite", //Our database server to be use
    database: "./database/database.db", //database location
    synchronize: true, //to automatically synchronize our database
    entities: [
        require('./entities/User'), //User.js location
        require('./entities/todo'), //todo.js location
    ]
})


app.get('/', (req, res) => {
    res.send('Hello World')
});
//This is to register your information to the database
app.post('/register', async (req, res) => {

    let repo = typeorm.getRepository('Users')
    repo.save({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate
    })
    res.send('Registration Complete!')
});
//TO show all users in database
app.get('/users', async (req, res) => {
    let repo = await typeorm.getRepository('Users')
    res.send(await repo.find())
});
//This is to login to the registered user in the database
app.post('/login', async (req, res) => {
    let repo = typeorm.getRepository('Users')

    let x = await repo.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (x === undefined){
        res.send('Username or password not found')
    }
    else{
        res.send(x)
    }
});

//To register model to database
app.post('/todo', async (req, res) => {

    let repo = typeorm.getRepository('model')
    let todos = await repo.save({
        date_created: req.body.date_created,
        date_end: req.body.date_end,
        description: req.body.description,
        user_id: req.body.user_id
    })
    res.send(todos)
});

//THis is to show what are registered model from database
app.get('/todo', async (req, res) => {
    let repo = await typeorm.getRepository('model')
    res.send(await repo.find())
});

//This is to delete based from date created and description
app.delete('/todo', async (req, res) => {
    let repo = typeorm.getRepository('model')

    let toDelete = await repo.delete({
        date_created: req.body.date_created,
        description: req.body.description
    })

    if (toDelete === undefined){
        res.send('Model/s may not be registered!')
    }
    else{
        res.send('Model/s successfully deleted!')
    }
});


app.listen(9000, ()=>{
    console.log('The server is running')
});
