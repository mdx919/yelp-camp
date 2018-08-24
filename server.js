var express = require("express");
var app = express();

app.set("view engine", "ejs");

// the routes

app.get("/", function(req, res) {
    res.send("hell yelp camp")
})

//dont mess them for no reason
app.get("*", function(req, res){
    res.send("Wrong route please enter the correct route!")
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp camp app is listeing.......")
})