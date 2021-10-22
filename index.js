
const express = require('express')
const typeorm = require('typeorm')

const app = express()
app.use(express.json())


typeorm.createConnection({
    type: "sqlite",
    database: "./database/database.db",
    port: 5432,
    username: 'postgres',
    password: '123456',
    synchronize: true,
    entities: [
        require('./entities/User')
    ]
})


app.get('/', (req, res) => {
    res.send('Hello World')
});
app.post('/register', async (req, res) => {

    let repo = typeorm.getRepository('Users')
    repo.save({
        username: req.body.username,
        password: req.body.password
    })
    res.send('Registration Complete')
});


app.get('/users', async (req, res) => {
    let repo = await typeorm.getRepository('Users')
    res.send(await repo.find())
});

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
})


app.listen(9000, ()=>{
    console.log('The server is running')
})