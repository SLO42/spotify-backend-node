var express = require('express');
const { response } = require('../app');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req, "req")
    console.log(req.query, "params")

    let trackData = {};
    let artistData = {};

    req.spotify.SearchTracks(`track:${req.query.track}`)
    .then((response) => {
        console.log(response)
        // trackData = response.data
        res.send(response)
    })
    .catch(error = () => {
        console.error(error);
        res.send(error)
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