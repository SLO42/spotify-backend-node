var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    // console.log(req, "req")
    // console.log(req.query, "params")

    let trackData = {};
    let artistData = {};

    const tracks = await req.spotify.searchTracks(`track:${req.query.track}`)
    .then((response1 ) => {
        // console.log('t - start', response1, "t - end")
        return response1.body.tracks.items;
    })
    .catch(error = () => {
        // console.error(error);
        res.status(408).send(error)
        return null;
    })
    const artist = await req.spotify.searchArtists(`artist:${req.query.artist}`)
    .then((response2) => {
        // console.log("Artist - Start", response2, "Artist - End")
        return response2.body
    })
    .catch(error = () => {
        // console.error(error);
        res.status(408).send(error)
    })
    res.status(200).send([tracks, artist])
})

module.exports = router;