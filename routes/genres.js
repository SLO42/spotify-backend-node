// FROM DOCS
// spotifyApi.getAvailableGenreSeeds()
//   .then(function(data) {
//     let genreSeeds = data.body;
//     console.log(genreSeeds);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });

var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const genres = await req.spotify.getAvailableGenreSeeds()
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        res.status(408).send(error)
    })
    res.status(200).send(genres)
})

module.exports = router;