if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// express is a framework for Node js(web fremworks are software that acccepts requests and sends responds)
const express = require("express");
//called app for simplicity
const app = express();
//The fs module enables interacting with the file system
const fs = require("fs");
//The path module provides utilities for working with file and directory paths
const path = require("path");
//allows hashing of password
const bcrypt = require("bcrypt");
//module imported to generate a unique id for each user, fourth version!
const { v4: uuidv4 } = require("uuid");
// Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies.
//Passport does not mount routes or assume any particular database schema, which maximizes flexibility and allows application-level decisions to be made by the developer.
// const passport = require("passport");
// Flash is an extension of connect-flash with the ability to define a flash message and render it without redirecting the request.
const flash = require("express-flash");


// Express. js uses a cookie to store a session id (with an encryption signature) in the user's browser and then,
// on subsequent requests, uses the value of that cookie to retrieve session information stored on the server
const session = require("express-session");

//crete file store
// const createFileStore = require("session-file-store")

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const methodOverride = require("method-override");


// A body parser is a piece of middleware that takes in code, and applies some functions so that it can be read by the browser
// see following tutorial if needed https://www.youtube.com/watch?v=vKlybue_yMQ&ab_channel=codedamn
var bodyParser = require("body-parser");
let users = [];



// function that acts as middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());



//remember app is shortcut for express().something
// sets the directory of views to the directory name to the directory + views

//To setup view engine, you need the write this middleware in your index.js:
//What is Middleware? It is those methods/functions/operations
//that are called BETWEEN processing the Request and sending the Response in your application method.

app.set("views", path.join(__dirname, "./views"));
// set that the folder publics files should be accesed as static
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public")); // express middleware to serve the static files such as css and js to the client using the express HTTP framework
// sets view engine to express javascript
app.set("view-engine", "ejs");
//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: false }));
// uses express flash to render templates?
app.use(flash());
// creates session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


//GET LOGIN, checks if not authenticated, the function will redirect to index if authenticated or go to next if not authenticated
app.get("/", (req, res) => {
  // will render login but will not redirect till the post request
  
  // console.log({ ID: req.user.ID });
  res.render("login.ejs");
});

//POST LOGIN, checks if not authenticates if succes takes to index, if not back to login
// post will actually "post on the website"
app.post( "/", (req, res) => {
  // console.log(req.session);
  req.session.username = req.body.ID

  
  res.redirect('/home')
})

app.get("/beforeTrialsQuestionaire", (req,res)=>{
  res.render("beforeTrialsQuestionaire.ejs", { ID: req.session.username });
  
});


app.get("/testScenario", (req,res)=>{
  res.render("testScenario.ejs", { ID: req.session.username });
  
});


//when get request will render to index the variable name attached to a string
app.get("/scenario1", (req, res) => {
  res.render("scenario1.ejs", { ID: req.session.username });
  // console.log( { ID: req.session.username })

  
  
});

//TESTING STUFF OUT IF NOT WORKING DELETE
app.get("/scenario2", (req, res) => {
  res.render("scenario2.ejs", { ID: req.session.username });
});


//TESTING STUFF OUT IF NOT WORKING DELETE
app.get("/scenario2", (req, res) => {
  res.render("scenario2.ejs", { ID: req.session.username });
});

app.get("/scenario3", (req, res) => {
  res.render("scenario3.ejs", { ID: req.session.username });
});

var groupA = [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79]
var groupB = [2,5,8,11,14,17,20,23,26,29,32,35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80]
var groupC = [3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78]

app.get("/home", (req, res) => {
  // var userIDstring = JSON.stringify({ ID: req.session.username });
  // var userIDparsed = JSON.parse(userIDstring);
  // console.log(userIDparsed);
  userIDparsed = req.session.username;
  // console.log(userIDparsed);
  if(groupA.includes(parseInt(userIDparsed))){
    // console.log("sending to Group A");
    // console.log(userIDparsed);
    res.render("homeGroupA.ejs");
    
  }
  

  else if(groupB.includes(parseInt(userIDparsed)))
 
      {
    // console.log(userIDparsed);
    console.log("sending to Group B");
    res.render("homeGroupB.ejs");
  }
    

  else if(groupC.includes(parseInt(userIDparsed)))
    {
    // console.log(userIDparsed);
    res.render("homeGroupC.ejs");
  }

  else{
    
     
  }

});







//renders logout page
// app.get("/logOut",(req, res) => {
//   res.render("logOut.ejs", { ID: req.session.username });
 
// });


//DELETE LOGOUT
// uses logout function to logout and redirects to login
// app.delete("/logout", (req, res) => {
//   req.logOut();
//   res.redirect("/login");
// });


// _            ___  _  _      
// | | ___  ___ |  _||_|| | ___ 
// | || . || . ||  _|| || || -_|
// |_||___||_  ||_|  |_||_||___|
//         |___|   

// creating a post route so that I can send the variables to the back end node, and then add them to the log file


app.post("/testScenario", (request) =>{
  var dataToBeLogged = JSON.stringify(request.body)
  // console.log(dataToBeLogged);
  
  // creates a log
  var logger = fs.createWriteStream('log.json', {
    flags: 'a' // flags allow to set if old data should be stored, a stands for appending mod, write removes and writes
  })
  
  // logger.write("non hostile button pressed by ID  on : sketch.js:152 Mon Dec 13 2021 14:06:19 GMT+0000 (Greenwich Mean Time)" + "/n") 
  // append string to your file")

  // UNCOMMENT THIS
  logger.write(dataToBeLogged + "\n" )
  // console.log("posting in Scenario1")
  // res.json({ msg: 'success' });
})


app.post("/scenario1", (request) =>{
  var dataToBeLogged = JSON.stringify(request.body)
  // console.log(dataToBeLogged);
  
  // creates a log
  var logger = fs.createWriteStream('log.json', {
    flags: 'a' // flags allow to set if old data should be stored, a stands for appending mod, write removes and writes
  })

  // UNCOMMENT THIS
  logger.write(dataToBeLogged + "\n" )


})


app.post("/scenario2", (request) =>{
  var dataToBeLogged = JSON.stringify(request.body)
  
  
  // creates a lo
  var logger = fs.createWriteStream('log.json', {
    flags: 'a' // flags allow to set if old data should be stored, a stands for appending mod, write removes and writes
  })
  

  logger.write(dataToBeLogged + "\n" )
  


}  )


app.post("/scenario3", (request) =>{
  var dataToBeLogged = JSON.stringify(request.body)
  
  
  // creates a lo
  var logger = fs.createWriteStream('log.json', {
    flags: 'a' // flags allow to set if old data should be stored, a stands for appending mod, write removes and writes
  })
  
  
  logger.write(dataToBeLogged + "\n" )

}  )


app.listen(5000);
