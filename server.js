 const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config/main');
const User = require('./server/models/user');
const jwt = require('jsonwebtoken');
const path = require('path');
const mongoose = require('mongoose');

const api = require('./server/routes/api');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', api);

app.use(morgan('dev'));

app.use(passport.initialize());

mongoose.createConnection(config.database);

require('./config/passport')(passport);

const apiRoutes = express.Router();

apiRoutes.post('/register', function(req,res){
	if(!req.body.email || !req.body.password){
		res.json({ success: false, message: 'Type your fucking password and email, bitch!'});
	} else {
		const newUser = new User({
			email: req.body.email,
			password: req.body.password
		});

		newUser.save(function(err){
			if(err) {
				return res.json({success: false, message: 'That email address already exists.'});	
			} else{
			res.json({success:true, message: 'Successfully created new user.'});
		}});
	}
});

apiRoutes.post('/authenticate', function(req,res){
	User.findOne({
		email: req.body.email
	},function(err, user){
		if (err) throw err;

		if (!user){
			res.send({ success: false, message: 'Authenticate failed. User not found.'});
		} else {
			user.comparePassword(req.body.password, function(err, isMatch){
				if (isMatch && !err){
					const token = jwt.sign({data: user}, config.secret, {
						expiresIn: 10080
					});
					res.json({ success: true, token: 'JWT' + token});
				} else{
					res.send({ success: false, message: 'Authentication failed. Passwords didnt match. '});	
				}
			});
		}
	});
});

apiRoutes.get('/dashboard', passport.authenticate('jwt',{ session: false}), function(req, res){
	res.send('It worked! User id is: '+ req.user._id + '.');
	
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
	console.log('server is running on localhost: '+ port);
});

app.use('/api', apiRoutes);
