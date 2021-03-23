const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { graphqlHTTP } = require('express-graphql')
const Schema = require( './schemas/schema')
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config();


mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.Promise = global.Promise
var db = mongoose.connection
db.once('open', function () {
    console.log('Mongo connection succesfull')
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
    '/graphql',
    graphqlHTTP({
      schema: Schema,
      graphiql: true ,
    }),
  );

// catch 404 and forward to error handlers
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: err
      });
})

module.exports = app
