var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    console.log(req, "req")
    console.log(req.query, "params")

    let trackData = {};
    let artistData = {};

    await req.spotify.SearchTracks(`track:${req.query.track}`)
    .then((response) => {
        console.log(response)
        // trackData = response.data
        res.status(200).send(response)
    })
    .catch(error = () => {
        console.error(error);
        res.status(408).send(error)
    })
    // req.spotify.SearchTracks(`track:${req.params.track.name}`)
    // .then(response = () => {
    //     req.spotify.SearchArtists(`artist:${req.params.artist.name}`)
    //     .then(response = () => {

    //     })
    // })
    // .catch(error = () => {
    //     console.log(error)
    // })


    // req.spotify.SearchTracks(`track:${req.params.track.name}`)
    // .then((responseOne) => {
    //     req.spotify.SearchArtists(`artist:${req.params.artist.name}`)
    //     .then((responseTwo) => {

    //     })
    //     .catch((error))

    // })
    // .catch((error) => {

    // })
    // if (trackData and artistData !== null or empty)
    // res.send(trackData, artistData)
})

module.exports = router;