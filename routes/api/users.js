const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
var bodyParser = require('body-parser');



// Load Input Validation

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// Load User model
const User = require('../../models/User');
const Role = require('../../models/Role');


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    console.log("1")
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log("2")
        // Check Validation
    if (!isValid) {
        return res.status(400).json({ errors, msg: " Somefields are empty" });
    }
    console.log("req.body ", req.body);

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            console.log("3");

            const role = new Role({
                id: 3,
                name: 'candidat'

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
                password: req.body.password,
                handle: req.body.handle,
                status: req.body.status,
                education: newEdu,
                experience: newExp,
                roleId: role


            });


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser

                        .save()
                        .then(user => res.json({ user, success: true }))
                        .catch(err => console.log(err));
                    //.catch(err => console.log(err));
                });
            });
        }
    });
});



// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                //const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
                const payload = { id: user.id, email: user.email }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey, { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                            user: user,
                            expiresIn: 3600
                        });
                        console.log("u are connected here" + token + "\n" + user);

                    }
                );
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log("22");
        res.json(
            /*{
                  id: req.user.id,
                  name: req.user.name,
                  email: req.user.email,
                  roleId: req.user.roleId
                  
               
                }*/
            req.user);
    },
    /**
     * @route POST api/users/profile
     * @desc Return the User's Data
     * @access Private
     */
    router.get('/profile', passport.authenticate('jwt', {
        session: false
    }), (req, res) => {
        return res.json({
            user: req.user
        });
    })

);

// @route   GET api/users/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};

    User.find()
        .populate('user', ['name', 'avatar'])
        .then(users => {
            if (!users) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(users);
        })
        .catch(err => res.status(404).json({ user: 'There are no profiles' }));
});
// @route   GET api/admin/add-recruter
// @desc    add recruteur 
// @access  admin
router.post('/addrecruter',
    passport.authenticate('jwt', { session: false }),
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

                const role = new Role({
                    id: 2,
                    name: 'recruter'

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
                    handle: req.body.handle,
                    status: req.body.status,
                    education: newEdu,
                    experience: newExp,
                    roleId: role


                });


                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser

                            .save()
                            .then(user => res.json({ user, success: true }))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    });




module.exports = router;