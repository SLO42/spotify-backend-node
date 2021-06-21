// const { response } = require('express');
var express = require('express');
// const SpotifyWebApi = require('spotify-web-api-node');
var router = express.Router();

router.get('/', async function(req, res, next) {
    // console.log(req, "req")
    console.log(req.query, "params")

    // var spotifyApi = new SpotifyWebApi();
    console.log("SPOT", req.spotify)
    

    const tracks = await req.spotify.searchTracks(`track:${req.query.track}`, {limit: 1})
    .then((response ) => {
        console.log('t - start', response, "t - end")
        return response.body;
    })
    .catch(error = () => {
        // console.error(error);
        res.status(408).send(error)
        return null;
    })

    const artist = await req.spotify.searchArtists(`artist:${req.query.artist}`, {limit: 1})
    .then((response) => {
        console.log("Artist - Start", response, "Artist - End")
        // console.log(response2.body)
        return response.body
    })
    .catch(error = () => {
        // console.error(error);
        res.status(408).send(error)
    })

    res.status(200).send([tracks, artist])

})

module.exports = router;