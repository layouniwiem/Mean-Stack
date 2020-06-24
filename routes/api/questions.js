const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');





// Load Validation
const validateQuestionInput = require('../../validation/question')


// Load Test Model
const Test = require('../../models/Test');
// Load User Model
const User = require('../../models/User');
// Load Question Model
const Question= require('../../models/Question');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ Question: 'Test Works' }));

// @route   Test api/Question
// @desc    Create Question
// @access  Private

router.post(
    '/add-question',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateQuestionInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }     
       const newQuestion =new Question({
        title: req.body.title,
        description: req.body.description,
        response: req.body.response
        
    });
     




    newQuestion.save().then(question => res.json(question));

}
);
// @route   test api/tests/question/:id
// @desc    Add question to test
// @access  Private
router.post(
    '/question/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateQuestionInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
     
      Question.findById(req.params.id)
        .then(question => {
            question = {
            title: req.body.title,
            description: req.body.description,
            response: req.body.response,
            
          };
  
        
  
          // Save
          question.save().then(question => res.json(question));
        })
        .catch(err => res.status(404).json({ question_notfound: 'No test found' }));
    }
  );

module.exports = router;