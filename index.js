const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var path = require("path")
var http = require('http');
var http2 = require('http2');
var fs = require('fs')
const spdy = require('spdy');

const app = express();
console.log(app)

/* var router = express.router() */

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

app.use(function (req, res, next) {
  console.log('Time1:', Date.now())
  next()
})

/* router.get('/user/:id', function (req, res, next) {
  // next()
  // res.send('special')
  next()
}) */
/* app.use('/', router) */

app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // send a regular response
  res.send('regular')
  //next()
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', function (req, res, next) {
  // next()
  res.send('special')
})




/* function logOriginalUrl(req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod(req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

var logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, function (req, res, next) {
  res.send('User Info')
})


app.get('/', function (req, res, next) {
  res.send('USER')
})
 */

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.set('views', path.normalize(__dirname + '/'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

/* app.get("/", (req, res) => res.send("Hello World!"));  */

/* app.get("/", (req, res) => res.render("index")); */
/*   app.get("/", (req, res) => {
  for(var i = 0; i < 200; i++){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         //  document.getElementById("body").append(i)
        }
    };
    xhttp.open("GET", "https://reqres.in/api/users?page=2", true);
    xhttp.send();
  }
});   */

const dummyDb = { subscription: null }; //dummy in memory store

const saveToDatabase = async subscription => {
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription;
};

// The new /save-subscription endpoint
app.post("/save-subscription", async (req, res) => {
  const subscription = req.body;
  await saveToDatabase(subscription); //Method to save the subscription to Database
  res.json({ message: "success" });
});

app.post("/req", async (req, res) => {
  setTimeout(function () {
    res.json({ message: process.pid });
  }, 10)
});

// console.log(path.normalize(__dirname + '/keys/ssl.key'))

/* var httpServer = http.Server(app);
httpServer.listen(port, function () {
  console.log("Express HTTP/1 server started");
}); */

/*  var httpsOptions = {
  'key': fs.readFileSync(path.normalize(__dirname + '/keys/ssl.key')),
  'cert': fs.readFileSync(path.normalize(__dirname + '/keys/ssl.crt')),
};

var http2Server = http2.createSecureServer(httpsOptions, app);
http2Server.listen(port, function () {
  console.log("Express HTTP/2 server started");
});  */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/* spdy
  .createServer({
    'key': fs.readFileSync(path.normalize(__dirname + '/keys/ssl.key')),
    'cert': fs.readFileSync(path.normalize(__dirname + '/keys/ssl.crt')),
  }, app)
  .listen(port, (err) => {
    if (err) {
      throw new Error(err);
    }

  
    console.log('Listening on port: ' + port + '.');
   
  });  */