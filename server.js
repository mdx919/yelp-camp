var express         = require("express"),
     app            = express(),
     bodyParser     = require("body-parser"),
     mongoose       = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Bear Mountain",
//         image: "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=63ffaa8c9b9aca319b57204b5d620f56&auto=format&fit=crop&w=500&q=60"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground:");
//             console.log(campground)
//         }
//     });
        
// the routes
app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/campgrounds", function(req, res) {
    //get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: allCampgrounds });
        }
    })
})

app.post("/campgrounds", function(req, res){
    //get data from form 
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image }; 
    
    //create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreate){
        if (err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new")
})

//dont mess them for no reason
app.get("*", function(req, res){
    res.send("Wrong route please enter the correct route!")
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp camp app is listeing.......")
})