var express = require('express');
var router = express.Router();



const User = require('../models/User.model')

const Profile = require('../models/Profile.model')


router.get('/profile/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .populate('profile')
    .then((foundUser) => {
      res.json(foundUser)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.post('/profile-edit/:userId', (req, res, next) => {
  const profileData = {
    profile_image: req.body.profile_image,
    bio: req.body.bio,
    age: req.body.age,
  };

  // Find or create a profile for the user
  Profile.findOneAndUpdate(
    { user: req.params.userId },
    profileData,
    { upsert: true, new: true }
  )
    .then((updatedProfile) => {
      // Update the user's profile reference
      User.findByIdAndUpdate(
        req.params.userId,
        { profile: updatedProfile._id },
        { new: true }
      )
        .populate('profile')
        .then((updatedUser) => {
          console.log(updatedUser)
          res.json(updatedUser)
        })
    })
    .catch((err) => {
      console.log(err)
    })
});




module.exports = router;
