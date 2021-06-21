var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var searchRouter = require('./routes/search')
var genresRouter = require('./routes/genres')
var recRouter = require('./routes/recommendation')


require('dotenv').config();
var app = express();
app.use(cors());

var SpotifyWebApi = require('spotify-web-api-node');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var clientId = process.env.SPOT_ID,
  clientSecret = process.env.SPOT_SECRET;
var redirect_uri = 'localhost:8888';

// create the spotifyWebApi object
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

let expires_at;


// grab client creds for the first time on app launch

const setTokens = (callback) => {
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token is ' + data.body['access_token']);
      spotifyApi.setAccessToken(data.body['access_token']);
      let d = new Date();
      console.log("now: ", d);
      expires_at = new Date(d.setHours((d.getHours() + 1)));
  
      console.log("Expires at: ", expires_at)
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
  );
  if (callback) callback();
}

setTokens(null);

// middleware for sending spotify object to routes as needed
// can refresh Spotify Access token as needed

app.use((req, res, next) => {
  req.spotify = spotifyApi;

  const d1 = new Date();
  // refresh token as needed
  if (d1.getTime() >= expires_at.getTime() ){
    setTokens(next());
  }
  else {
    next();
  }
})


// routes with a desc
const ROUTES = {
  '/': 'Home Page',
  '/login': 'login route using Spotify 20Auth',
  '/search': 'Search for track or artist',
  '/genres': 'Genre seeds',
  '/recommendation': 'Song recommendation based on seeds',
};

// routes after above middleware.
app.use('/', indexRouter);
app.use('/login', loginRouter)
app.use('/search', searchRouter )
app.use('/genres', genresRouter)
app.use('/recommendation', recRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  let returnHTML = '<h1>Page Not Found (404) </h1> <h2> Available Routes: </h2> <ul>';
  Object.keys(ROUTES).map((key, index) => {
    returnHTML += `<li key=${index}> <a href="${key}"> <p>${key}: ${ROUTES[key]} </p> </a> </li>`;
  })
  returnHTML += '</ul>'

  // render the error page
  res.status(err.status || 500);
  res.send(returnHTML);
});





module.exports = app;
