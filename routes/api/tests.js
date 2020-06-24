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
router.get('/test', (req, res) => res.json({ msg: 'Test Works' }));

// @route   Test api/tests
// @desc    Create test
// @access  Private

router.post(
    '/add-test',
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

      const newTest = new Test({
          
           questions:newQuestion
          
               
          })


      newTest.save().then(test => res.json(test));

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
     
      Test.findById(req.params.id)
        .then(test => {
          const newQuestion = new Question ({
            title: req.body.title,
            description: req.body.description,
            response: req.body.response,
            
          });
          // Save

          newQuestion.save().then(question => res.json(question));

          // Add to comments array
          test.questions.unshift(newQuestion);
  
          // Save
          test.save().then(test => res.json(test));
        })
    }
  );
// @route   GET api/tests
// @desc    Get tests
// @access  Public
router.get('/tests', (req, res)=>{
  Test.find()
    .sort({ date: -1 })
    .then(test => res.json(test))
    .catch(err => res.status(404).json({ notestsfound: 'No tests found' }));
});
// @route   GET api/tests/:id
// @desc    Get test by id
// @access  Public

router.get('/:id', (req, res) => {
  Test.findById(req.params.id)
  .populate('question', ['title', 'response'])
    .then(test => res.json(test))
    .catch(err =>
      res.status(404).json({ testnotfound: 'No test found with that ID 2' })
    );
});


module.exports = router;