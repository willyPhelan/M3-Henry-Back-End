const express = require('express');
var path = require('path');

const app = express();

app.use(express.static('./public/'));


app.get('/response', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/response.html'))
})

app.listen(3001, () => {
    console.log('Port 3001, Ready!')
});