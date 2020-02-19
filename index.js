const express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
const app = express();
var i =0;
setInterval(function(){
    console.log(i);
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
    console.log(req.body); 
    setTimeout((req) =>{    
        res.json({"req":"asd"});
    },1000);
});

app.listen(3000, () => console.log('app listening on port 3000!'));