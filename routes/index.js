var express = require('express');
var router = express.Router();


const ROUTES = {
  '/': 'Home Page',
  '/login': 'login route using Spotify 20Auth',
  '/search': 'Search for track or artist',
};


/* GET home page. */
router.get('/', function(req, res, next) {
  let returnHTML = '<h1>Spotify Backend Api </h1> <h2> Available Routes: </h2> <ul>';
  Object.keys(ROUTES).map((key, index) => {
    returnHTML += `<li key=${index}> <a href="${key}"> <p>${key}: ${ROUTES[key]} </p> </a> </li>`;
  })
  returnHTML += '</ul>';

  res.status(200).send(returnHTML);
});

module.exports = router;
