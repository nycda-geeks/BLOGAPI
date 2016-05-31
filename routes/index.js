var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var path = require('path')
var sequelize = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@192.168.99.100:32769/blogapp')
var session = require('express-session')
var Blogusers = sequelize.define('blogusers', {

	user_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	user_pass: {
		type: Sequelize.STRING,
		allowNull: false
	}	
},   
{	
	timestamps: false,
	tableName: 'blogusers',
	
})

var Blogposts = sequelize.define('blogposts', {

	post_title: {
		type: Sequelize.STRING,
		allowNull: false
	},

	post_cont: {
		type: Sequelize.TEXT,
		allowNull: false
	}
},
{
	timestamps: false,
	tableName: 'blogposts',
})



/* GET home page. */

router.get('/', function(req, res) {
	res.redirect('/blogapp')
})

router.get('/blogapp', function(req, res) {
	res.render('index', { title: 'BLOGAPP' });
});


/* GET register page */

router.get('/register', function(req, res) {
	res.render('register', { title: 'Register'})
})

/* POST register page */

router.post('/register', function(req, res) {

	

	sequelize.sync().then(function () {
		Blogusers.create({
			user_name: req.body.user_name ,
			user_pass: req.body.user_pass
		})
	})

	res.redirect("/login")
})

/* GET login page */

router.get('/login', function(req, res) {
	res.render('login', { title: 'Login'})
})

/* GET create page */

router.get('/create', function(req, res) {
	res.render('create', { title: 'Create Post'})
})


/* POST create page */

router.post('/create', function(req, res) {


	sequelize.sync().then(function () {
		Blogposts.create({
			post_title: req.body.post_title ,
			post_cont: req.body.post_cont
		})
	})

	res.redirect('/all')

})

/* GET profile page */

router.get('/profile', function(req, res) {
	res.render('profile', { title: 'Profile Page'})
})

/* GET all posts page */

router.get('/all', function(req, res) {
	
	Blogposts.findAll().then(function(posts) { 
		var data = posts.map(function(blogposts) { 
			return {
				post_title: blogposts.dataValues.post_title,
				post_cont: blogposts.dataValues.post_cont
			} 

		}) 
		
		res.render('all', {
			posts:data
		})

	}) 
		
}) 

/* GET find posts page */

router.get('/all/find', function(req, res) {
	res.render('find', { title: 'Find Posts'})
})


module.exports = router;
