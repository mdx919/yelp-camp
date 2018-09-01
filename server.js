var express         = require("express"),
     app            = express(),
     bodyParser     = require("body-parser"),
     mongoose       = require("mongoose"),
     Campground     = require("./models/campground"),
     seedDB         = require("./seeds"),
     Comment        = require("./models/comment")

mongoose.connect("mongodb://localhost:27017/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();




// Campground.create(
//     {
//         name: "Bear Mountain",
//         image: "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=63ffaa8c9b9aca319b57204b5d620f56&auto=format&fit=crop&w=500&q=60",
//         description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
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

app.get("/index", function(req, res) {
    //get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    })
})

app.post("/index", function(req, res){
    //get data from form 
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description }; 
    
    //create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreate){
        if (err){
            console.log(err);
        } else {
            res.redirect("campgrounds/index");
        }
    })
})

//show form to create new campground
app.get("/index/new", function(req, res) {
    res.render("campgrounds/new")
});

//show a single campground info
app.get("/index/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    })
    
})


//=======================
//COMENTS ROUTES
//=======================
app.get("/index/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", { campground: campground });
        }
    })
})

app.post("/index/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err)
            res.redirect("/index")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/index/" + campground._id);
                }
            })
        }
    })
})



//dont mess them for no reason
app.get("*", function(req, res){
    res.send("Wrong route please enter the correct route!")
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp camp app is listeing.......")
})