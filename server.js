var express = require('express');
var mysql = require('mysql');
var bodyParser= require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
var currentUser = {};

// define database client configuration
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'termin1234',
    database: 'cartech'
});


console.log("connect to database");
db.connect();

// set port
var port = process.env.PORT || 9750
app.set("view engine", "ejs");
app.use(express.static(__dirname));

//-------------------ROUTES-------------------//

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.get('/signUp', function(req, res){
    res.sendFile(__dirname + "/signUp.html");
})

app.post('/logout', urlencodedParser, function (req, res) {
    if (!req.body){
        return res.sendStatus(400)
    }
    console.log("Logging out");
    currentUser = {};
    res.sendFile(__dirname + "/index.html");

})


app.post('/signUp', urlencodedParser, function (req, res) {
    if (!req.body){
        return res.sendStatus(400)
    }

    console.log("[sign up] adding user");
    // insert new user into database
    db.query("INSERT INTO users (firstname, lastname, age, address, license, model, username, password ) VALUES ('"+req.body.firstname+"', '"+req.body.lastname+"', '"+req.body.age+"', '"+req.body.address+"', '"+req.body.license+"', '"+req.body.model+"', '"+req.body.username+"', '"+req.body.password+"')", function(err, rows){
        if(err){
            console.log("[sign up] query error");
        }
        else{
            console.log("[sign up] successful insert");
        }

        res.sendFile(__dirname + "/index.html");
    });

})

app.post('/signIn', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  console.log("[sign in] logging in");
  // query database for user records that match username
  if (req.body.username == "CTA902" && req.body.password =="Grant2198"){
    res.render("admin",{cardsList:[]});
  }else{
    db.query("SELECT * from users WHERE username= '"+req.body.username+"' AND password= '"+req.body.password+"'", function(err, rows){
        if(err){
            console.log("[sign in] query error");
            res.sendFile(__dirname + "/index.html");
        }
        else{
            currentUser = rows[0];
            console.log("[sign in] successful login");
            res.render("userpage",{user:currentUser});
        }
    });
  }
})



app.post('/card', urlencodedParser, function (req, res) {
    if (!req.body){
        return res.sendStatus(400)
    }

    console.log("[card] adding job card");
    // insert new job card for current user
    db.query("INSERT INTO cards (license, issue, status) VALUES ('"+currentUser.license+"', '"+req.body.issue+"', 'NEW')", function(err, rows){
        if(err){
            console.log(err);
            res.render("userpage",{user: currentUser});
        }
        else{
            console.log("[card] successful insert");
            res.render("userpage",{user: currentUser});
        }
    });
})

app.post('/search', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  console.log("[searching...]");
    db.query("SELECT * from cards WHERE license= '"+req.body.license+"'", function(err, rows){
        if(err){
            console.log("[] query error");
            res.render("admin",{cardsList:[]});
        }
        else{
            cardinfo = rows;
            console.log("[Search] successful");
            console.log(cardinfo);
            res.render("admin",{cardsList: cardinfo});
        }
    });
})

app.post('/view', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  console.log("[searching...]");
    db.query("SELECT * from cards WHERE license= '"+req.body.license+"'", function(err, rows){
        if(err){
            console.log("[] query error");
            res.sendFile(__dirname + "/");
        }
        else{
            cardinfo = rows[0];
            console.log("[Search] successful");
            res.render("userpage",{user:cardinfo});
        }
    });
})

app.listen(port, function(){
  console.log("app running...")
});
