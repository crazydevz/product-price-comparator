const express = require('express'); //express import
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // package for parsing HTTP request bodies

const config = require('./config/config');

const app = express(); // Server App Instance

app.use(bodyParser.urlencoded({extended:true}));

//connect to mongoDB
// const db = 'mongodb://localhost:27017/smart-shopping-list';
const db = 'mongodb+srv://crazydevz:Dezong%4041@cluster0.5j8tc.mongodb.net/smart-shopping-list?retryWrites=true'
mongoose.promise = global.promise;

// connect mongoose to database
mongoose.connect(db,function(err){
  if(err)console.log('Error Connecting to MongoDB: '+ err)
  else console.log('Server connected to MongoDB @ localhost:27017');
});

const usersApi = require('./routes/users'); // import users API
app.use('/users', usersApi) // use users API

const storesApi = require('./routes/stores');
app.use('/stores', storesApi);

const fareApi = require('./routes/fare');
app.use('/fare', fareApi);

// root level request for server status test purpose
app.get('/', (req, res, next) => {
  res.send('FYP Root is Alive!');
  next();
});

// Finally, bring the server instance up
app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});