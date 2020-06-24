const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
var bodyParser = require('body-parser');



// Load Input Validationconst validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validateRegisterInput = require('../../validation/register');

const validateLoginInput = require('../../validation/login');




// Load User model
const User = require('../../models/User');
const Role = require('../../models/Role');

// @route   GET api/admin/test
// @desc    Tests admin route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'admin works' }));

// @route   GET api/admin/add-recruter
// @desc    add recruteur 
// @access  admin
router.post('/add-recruter',
passport.authenticate('jwt', { session: false }) ,
(req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
      
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });
     
     const role = new Role ( {
        id: 2,
        name:'recruter'
        
        });
      
    

     
          const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };
          const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };
             
             const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              avatar,
              password: req.body.password,
              handle:req.body.handle,
              status:req.body.status,
              education:newEdu,
              experience:newExp,
              roleId:role


            });


      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
        
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
        });
    }
    });
  });

// @route   GET api/admin/all
// @desc    Get all profiles
// @access  Private
router.get('/all-users', (req, res) => {
    const errors = {};
  
    User.find()
      .populate('user', ['name', 'avatar'])
      .then(users => {
        if (!users) {
          errors.noprofile = 'There are no users';
          return res.status(404).json(errors);
        }
  
        res.json(users);
      })
      .catch(err => res.status(404).json({ user: 'There are no profiles' }));
  });
  
// @route   GET api/admin/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};
  passport.authenticate('jwt', { session: false }),
  User.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(user => {
      if (!user) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }else {

      res.json(user);
      }
    })
    .catch(err =>
      res.status(404).json({user: 'There is no profile for this user' })
    );
});
  
// @route   DELETE api/admin/del-user
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/del-user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
      User.findOneAndRemove({ _id:req.params.user_id}).then(() =>
        res.json({ success: true })
      );
    });
  


    
  module.exports = router;