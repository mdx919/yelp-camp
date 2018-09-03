var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
        {
            name: "Clouds Rest",
            image: "https://images.unsplash.com/photo-1530375323520-248ebdaa967f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d0629c47a367b54fb1ebdcbeb6ad28f5&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
        {
            name: "Starry Night",
            image: "https://images.unsplash.com/photo-1530102900583-143a3be5d43f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be72236f0cb67315dceb05d2dfb94710&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
        {
            name: "Fire Island",
            image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
        {
            name: "Fire Island",
            image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
        {
            name: "Starry Night",
            image: "https://images.unsplash.com/photo-1530102900583-143a3be5d43f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be72236f0cb67315dceb05d2dfb94710&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
        {
            name: "Fire Island",
            image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
        {
            name: "Starry Night",
            image: "https://images.unsplash.com/photo-1530102900583-143a3be5d43f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be72236f0cb67315dceb05d2dfb94710&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
        {
            name: "Fire Island",
            image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
        {
            name: "Starry Night",
            image: "https://images.unsplash.com/photo-1530102900583-143a3be5d43f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be72236f0cb67315dceb05d2dfb94710&auto=format&fit=crop&w=500&q=60",
            description: "Proin pharetra nisi ac purus condimentum venenatis. Curabitur suscipit varius porttitor. Sed ligula ligula, hendrerit quis turpis vitae, pretium commodo sapien. Sed interdum sagittis mattis. Curabitur a mi tristique, condimentum quam non, ultricies lacus. Donec commodo volutpat blandit. In eget ligula quam. Sed egestas interdum hendrerit."
        },
    ]

function seedDB(){
    //remove  all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("removed campgrounds!!")
            //add some campgrounds
                data.forEach(function(seed){
                    Campground.create(seed, function(err, campground){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("added a campground")
                            Comment.create({
                                text: "This place is great, but i wish there was internet",
                                author: "md"
                            }, function(err, comment){
                                if(err){
                                    console.log(err)
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment")
                                }
                            })
                        }
                    })
                })
         }
    })
    
}

module.exports = seedDB;