var express = require('express')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var log4js = require('log4js');
var morgan = require('morgan')
const app = express();
const axios = require('axios');
// prepare logger
var logger = log4js.getLogger();
log4js.configure({
  appenders: { root: { type: 'file', filename: 'log.log' },console: { type: 'console' } },
  categories: { default: { appenders: ['root','console'], level: 'all' } }
});
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())


// get faces
setTimeout((req) =>{  
axios.post('http://mypython:5000/api/faces')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
},10000);

// counter
var i =0;
setInterval(function(){
    console.log(i)
    i++;
},1000)
// routes
app.get('/', (req, res) => {
    logger.debug(req); 
    res.send('App is running!');
});
app.post('/connect', (req, res) => {
    logger.debug(req.body); 
    setTimeout((req) =>{    
        res.json({"accepted":true});
    },30000);
});

app.listen(3000, () => console.log('app listening on port 3000!'));