var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    console.log(req, "req")
    console.log(req.query, "params")

    let trackData = {};
    let artistData = {};

    await req.spotify.searchTracks(`track:${req.query.track}`)
    .then((response) => {
        console.log(response)
        if (response.status === 200) {

            trackData = response.data
        }
        // res.status(200).send(response)
    })
    .catch(error = () => {
        console.error(error);
        res.status(408).send(error)
    })
    
    await req.spotify.searchArtist(`artist:${req.query.artist}`)
    .then((response) => {
        console.log(response)
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
    console.log(trackData)
    console.log(artistData)
    res.send(trackData, artistData)
})

module.exports = router;