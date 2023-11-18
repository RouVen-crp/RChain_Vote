"use strict"
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const rho_deploy = require('./lib/rho_deploy.js');

// Parse command-line arguments
var host   = process.argv[2] ? process.argv[2] : "localhost"
var port   = process.argv[3] ? process.argv[3] : 40401
var uiPort = process.argv[4] ? process.argv[4] : 8080

// Configure the express app and RNode connection
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Start the express app
app.listen(uiPort, () => {
  console.log("Nth Caller Dapp server started.")
  console.log(`Connected to RNode at ${host}:${port}.`)
  console.log(`started on ${uiPort}`)
});
app.use(cors({origin:"*",}))
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle users registering new games
app.post('/getInfo', (req, res) => {
  let rho_code = `new getInfo, setInfo, message in {
    @{"global_factory"}!(*getInfo, *setInfo)
    |
    getInfo!(*message)
  }`;

  rho_deploy.func_deploy(rho_code, 3).then(
    (ret) => {
      res.end("\"" + ret + "\"");
    }
  );
});

app.post('/setInfo', (req, res) => {
  let rho_code = `new getInfo, setInfo in {
    @{"global_factory"}!(*getInfo, *setInfo)
    |
    setInfo!("${req.body.name}")
  }`;

  rho_deploy.func_deploy(rho_code, -1).then(
    () => {
      res.end("\"" + "SetInfo();" + "\"");
    }
  );
});
app.post('/login', (req, res) => {
  console.log("Login");
  console.log(req.body.ID);
  console.log(req.body.password);
  let rho_code = `new userinfo, register, login ,ret in {
                      @{"usr_factory"}!(*register, *login)
                     
                      |
                      login!("${req.body.ID}","${req.body.password}", *ret)
                  }`;
  rho_deploy.func_deploy(rho_code, 3).then(
      (ret) => {
          res.send("\"" + ret + "\"");
      }
  );
});
app.post('/register', (req, res) => {
  console.log(req.body.ID);
  console.log(req.body.password);
  let rho_code = `new  register,login ,ret in {
                      @{"usr_factory"}!(*register, *login)
                     
                      |
                      register!("${req.body.ID}","${req.body.password}", *ret)
                  }`;
  rho_deploy.func_deploy(rho_code, 2).then(
      (ret) => {
          res.send("\"" + ret + "\"");
      }
  );
});