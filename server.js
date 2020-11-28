const express = require('express');
const server = express();
const path = require('path')
const http = express()
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

server.use(express.static("website", {
    extensions: ['html', 'htm'],
}));

server.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});
let site = './website/index.html';

server.use("*", function(req, res, next){
      res.status(404).sendFile(__dirname + "/website/404.html");
    });


function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready!")});
}
module.exports = keepAlive