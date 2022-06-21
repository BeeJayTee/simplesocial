const express = require('express')
const app = express()
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const dbHash = process.env.DB_HASH
const dbUsername = process.env.USERNAME
const connectionString = `mongodb+srv://${dbUsername}:${dbHash}@users.2kn8x.mongodb.net/?retryWrites=true&w=majority`
const PORT = 8000

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database')
        // create db name
        const usersDb = client.db('users')
        // create collection name
        const usersCollection = usersDb.collection('user-list')

        // create posts database and posts collection
        const postsDb = client.db('posts')
        const poststCollection = postsDb.collection('posts')

        // set view engine to ejs
        app.set('view engine', 'ejs')

        // MIDDLEWARE
        // parses incoming requests with urlencoded payloads based on body-barser
        app.use(express.urlencoded( {extended: true} ))
        // serves the static files in the 'public' directory. Gives other files access to them.
        app.use(express.static('public'))
        // parses incoming requests with JSON payloads based on body-parser
        app.use(express.json())

        // begin making http requests below
        app.get('/', (req, res) => {
            res.render('signUp.ejs')
        })

        app.post('/sign-up', (req, res) => {
            const email = req.body.email
            const password = req.body.password
            usersCollection.find().toArray()
                .then(data => {
                    if (data.map(user => user.email).includes(email)) {
                        res.json('email already exists')
                    } else {
                        usersCollection.insertOne(
                            {
                                email: email,
                                password: password,
                                posts: []
                            }
                        )
                        .then(response => {
                            const id = (ObjectId(response.insertedId).toString())
                            res.json(id)
                        })
                    }
                })
        })

        app.get('/home', (req, res) => {
            res.render('home.ejs')
        })


        app.post('/home', (req, res) => {
            usersCollection.findOne({ _id: ObjectId(req.body.id) })
                .then(response => {
                    console.log(response)
                })
        })


        app.post('/send-post', (req, res) => {
            console.log(req.body)
            poststCollection.insertOne(
                {
                    date: new Date().toString(),
                    content: req.body.post,
                    user: req.body.userId
                }
            )
                .then(response => {
                    res.json()
                })
        })







        // establishes what port to run on 
        app.listen(process.env.PORT || PORT, _ => {
            console.log('Listening on 8000')
        })
    })
    .catch(err => console.error(err))