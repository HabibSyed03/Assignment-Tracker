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

module.exports = router;