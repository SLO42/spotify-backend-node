var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    console.log(req, "req")
    console.log(req.query, "params")

    let trackData = {};
    let artistData = {};

    req.spotify.searchTracks(`track:${req.query.track}`)
    .then((response) => {
        console.log('track', response)
        if (response.status === 200) {

            trackData = response.data
        }
        // res.status(200).send(response)
    })
    .catch(error = () => {
        console.error(error);
        res.status(408).send(error)
    })
    
    req.spotify.searchArtist(`artist:${req.query.artist}`)
    .then((response) => {
        console.log('artist', response)
        if (response.status === 200) {

            artistData = response.data
        }
        // res.status(200).send(response)
    })
    .catch(error = () => {
        console.error(error);
        res.status(408).send(error)
    })



    // })
    // if (trackData and artistData !== null or empty)
    console.log('trackData', trackData)
    console.log('artistData', artistData)
    res.send(trackData, artistData)
})

module.exports = router;