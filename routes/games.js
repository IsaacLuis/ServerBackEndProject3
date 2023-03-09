var express = require("express");
var router = express.Router();

const User = require('../models/User.model')
const Review = require('../models/Review.model')
const isAuthenticated = require('../middleware/isAuthenticated')
// games_pick

router.post('/add-wish/:userId', (req, res, next) => {




  User.findByIdAndUpdate(req.params.userId, {
    $addToSet: { games_pick: req.body.game }
    
  },
    { new: true })
    .then((updatedUser) => {
      return updatedUser.populate('games_pick')
    })
    
    // .then((populated) => {
    //     return populated.populate('posts')
    // })
    .then((second) => {
      res.json(second)
    })
    .catch((err) => {
      console.log(err)
    })


})

router.post("/delete/add-wish/:userId", (req, res, next) => {
  const gameId = req.body.gameId;
  if (typeof gameId !== "number") {
    res.status(400).json({ message: "Invalid game ID" });
    return;
  }
  User.findById(req.params.userId)
    .populate("games_pick")
    .then((foundUser) => {
      if (foundUser.games_pick.some((game) => game.id === gameId)) {
        const updatedGames = foundUser.games_pick.filter(
          (game) => game.id !== gameId
        );
        foundUser.games_pick = updatedGames;
        foundUser.save()
          .then((savedUser) => {
            res.json(savedUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "server" });
          })
      } else {
        res.json({ message: "Game not found in wishlist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "server error" });
    });
});

router.post('/reviews', isAuthenticated, (req, res) => {
  const { user, comment, rate } = req.body;

  // Create a new review instance using the Review model
  const newReview = new Review({
    user: req.user._id, 
    comment: req.body.comment,
    rate: req.body.rate
  });
  
  newReview.save()
    .then(() => res.status(201).send('Review created successfully'))
    .catch(error => {
      console.error('Error creating review:', error);
      res.status(500).send('Internal server error');
    });
});





module.exports = router;