var express         = require("express"),
     app            = express(),
     bodyParser     = require("body-parser"),
     mongoose       = require("mongoose"),
     passport       = require("passport"),
     LocalStrategy  = require("passport-local"),
     Campground     = require("./models/campground"),
     Comment        = require("./models/comment"),
     User           = require("./models/user"),
     seedDB         = require("./seeds");
     

mongoose.connect("mongodb://localhost:27017/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIGURATIONS
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})
        
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
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
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
app.get("/index/:id/comments/new", isLoggeIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", { campground: campground });
        }
    })
})

app.post("/index/:id/comments", isLoggeIn, function(req, res){
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

//AUTH ROUTES
app.get("/register", function(req, res) {
    res.render("register");
})

//handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/index")
            })
        }
    })
})

// show login routes
app.get("/login", function(req, res) {
    res.render("login");
})

//handling login logic
app.post("/login", passport.authenticate("local", 
    {   
        successRedirect: "/index",
        failureRedirect: "/login"
    }), function(req, res) {
    
});

//logout logic
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/index")
})

function isLoggeIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

//dont mess them for no reason
app.get("*", function(req, res){
    res.send("Wrong route please enter the correct route!")
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp camp app is listeing.......")
})