var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.data, req.body)
    // req.spotify.SearchTracks(track: )
    // req.spotify.SearchArtists(artist: )
    res.send("hi")
})

module.exports = router;