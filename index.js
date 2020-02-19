var express = require('express')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var log4js = require('log4js');

const app = express();
// prepare logger
var logger = log4js.getLogger();
log4js.configure({
  appenders: { root: { type: 'file', filename: 'log.log' },console: { type: 'console' } },
  categories: { default: { appenders: ['root','console'], level: 'all' } }
});
var i =0;
setInterval(function(){
    logger.debug(i);
    i++;
},1000)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('App is running!');
});
app.post('/connect', (req, res) => {
    logger.debug(req.body); 
    setTimeout((req) =>{    
        res.json({"req":"asd"});
    },3000);
});

app.listen(3000, () => console.log('app listening on port 3000!'));