 const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Goal = require('../models/goals');
var bodyParser = require('body-parser');


const db = 'mongodb://ruslankolup:101171@ds157233.mlab.com:57233/smart';
mongoose.Promise = global.Promise; 
mongoose.connect(db, function(err){
		if (err) {
			console.error('Error!'+err);
	}
});

var app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/goals', function(req, res){
	console.log('Get request');
	Goal.find({})
	.exec(function(err, goals){
		if (err){
			console.log('Error retrieving goals');
		}else {
			res.json(goals);
		}
	});
});

router.post('/goal'	, function(req, res){
	console.log('Post a goal');
var newGoal = new Goal();
    newGoal.goal = req.body.goal;
    newGoal.save(function(err, insertedGoal){
        if (err){
            console.log('Error saving goal');
        }else {
            res.json(insertedGoal);
        }
    });});

router.delete('/goal/:id', function(req, res){
	console.log('delete goal');
	Goal.findByIdAndRemove(req.params.id, function(err, deletedGoal){
		if (err) {
			res.send('Error deleting goal');
		}else{
			res.json(deletedGoal)
		}
	})
})

module.exports = router;