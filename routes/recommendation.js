// // Get Recommendations Based on Seeds
// spotifyApi.getRecommendations({
//     min_energy: 0.4,
//     seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
//     min_popularity: 50
//   })
// .then(function(data) {
//   let recommendations = data.body;
//   console.log(recommendations);
// }, function(err) {
//   console.log("Something went wrong!", err);
// });


var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    // console.log(req, "req")
    console.log(req.query, "params")


})

module.exports = router;