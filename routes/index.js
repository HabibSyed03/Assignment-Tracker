var express = require("express"),
    router = express.Router({ mergeParams: true });

// Requiring the Assignment model
var Assignment = require("../models/assignment")

// Default Home page route
router.get("/", function(req, res){
    res.render("index");
});

// All Assignments route
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

// Get route for new Assignment
router.get("/assignments/new", function(req, res){
    res.render("new");
});

// Post route for new Assignment
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

// Get route for specific Assignment
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

// Get route for edit Assignment
router.get("/assignments/:id/edit", function(req, res){
    Assignment.findById(req.params.id, function(err, findassignment){
        if(err){
            console.log("Error");
        }
        else{
            res.render("edit", {assignment: findassignment});
        }
    });
});

// Update route for an Assignment
router.put("/assignments/:id", function(req, res){
    Assignment.findByIdAndUpdate(req.params.id, req.body, function(err, updateassignment){
        if(err){
            res.redirect("/assignments");
        }
        else{
            req.flash("success", "Successfully edited the Assignment!")
            res.redirect("/assignments/" + req.params.id);
        }
    });
});

// Delete route for an Assignment
router.delete("/assignments/:id", function(req, res){
    Assignment.findByIdAndRemove(req.params.id, function(err, updateassignment){
        if(err){
            res.redirect("/assignments");
        }
        else{
            req.flash("success", "Successfully delete the Assignment!")
            res.redirect("/assignments");
        }
    });
});

// Exporting the router object to be able to used in the app.js
module.exports = router;