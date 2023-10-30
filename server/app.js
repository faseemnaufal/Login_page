const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require("cors")
const authenticate = require('./middlewares/authMiddleware')

const app = express()
const PORT = 3500


global.users = [
    {username: 'john@gmail.com', password: 'password'},
    {username: 'mark@gmail.com', password: 'password'}
]

const home = [
    {accountType: 'checking', balance: 5000, username: 'john@gmail.com'}
]

app.use(cors())
app.use(express.json())

app.post('/login', (req, res)=>{
    const username = req.body.username
    const password = req.body.password

    const user = users.find((user)=> user.username == username && user.password == password)
    if(user){
        //generate JWT
        const token = jwt.sign({username: user.username}, 'SECRETKEY')
        res.json({success:true, token: token})
    }else{
        // no authentication
        res.json({success: false, message: 'Not authenticated'})
    }
})

app.get('/home/:username', authenticate,(req, res) => {
    const username = req.params.username 
    const userHome = home.filter((home) => home.username == username)
    res.json(userHome)
    //res.json({ message: 'You have access to the contact information.' })
})

app.listen(3500, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})