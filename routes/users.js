/*
Importing express and invoking router method from express
*/
var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* GET users listing from db. */
router.get('/', function(req, res, next) {
  models.User.findAll({}).then(function(users) {
    res.render('users/index', {
      title: 'fazbook',
      users: users
    });
  });
});

// get new user page
router.get('/new', function(req,res,next){
  res.render('users/new', {title:'new user'})
});

// view particular user - show
router.get('/:id', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/show', { user: user, title:'show'});
  });
});

// route to handle post request to users
router.post('/', function(req, res, next) {
  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(function() {
    res.redirect('/users')
  });
});

// deleting a post route
router.delete('/:id', function(req, res, next) {
  models.User.destroy({
    where: { id: req.params.id }
  }).then(function(user) {
    res.redirect('/users');
    console.log('params',req.params.id);

  });
});
// edit user route
router.get('/:id/edit', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/edit', { user: user });
  });
});
// editing user data
router.put('/:id', function(req, res, next) {
  models.User.update({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/users/' + req.params.id);
  });
});


module.exports = router;
