var express = require("express"),
    router = express.Router({ mergeParams: true });

var Assignment = require("../models/assignment")

router.get("/", function(req, res){
    res.render("index");
});

router.get("/assignments", function(req, res){
    Assignment.find({}, function(err, assignments){
        if(err){
            console.log("Error");
        }
        else{
            res.render("assignments", {assignments: assignments});
        }
    });
});

router.get("/assignments/new", function(req, res){
    res.render("new");
});

router.post("/assignments", function(req, res){
    Assignment.create(req.body, function(err, newassignment){
        if(err){
            res.render("new");
        }
        else{
            req.flash("success", "Successfully created new Assignment!")
            res.redirect("/assignments");
        }
    })
});

router.get("/assignments/:id", function(req, res){
    Assignment.findById(req.params.id, function(err, findassignment){
        if(err){
            console.log("Error");
        }
        else{
            res.render("show", {assignment: findassignment});
        }
    });
});



module.exports = router;