var express = require('express');
const { response } = require('../app');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.data, req.body)
    console.log(req.params.track)
    console.log(req.params.artist)
    let trackData;
    let artistData;

    req.spotify.SearchTracks(`track:${req.params.track.name}`)
    .then(response = () => {
        console.log(response)
        trackData = response;
    })
    .catch(error = () => {
        console.error(error);
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
    res.send(trackData)
})

module.exports = router;