var express = require('express');
var router = express.Router();
var request = require ('sync-request');
var mongoose = require('mongoose');
var MovieWishListModel = require('../models/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// DISPLAY trending movies
router.get('/new_movies', async function(req, res, next) {
  var result= request('GET', `https://api.themoviedb.org/3/discover/movie?api_key=e06448432376f9133c8dc842285734fb&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&`);
  var result=JSON.parse(result.body);
  result = result.results;

  var movieList = result.map(function(movie){
    var image = movie.backdrop_path;

    if( movie.backdrop_path == null){
     image = '/images/generique.jpeg'}

    return {
      movieDbId: movie.id,
      title : movie.title,
      img : `https://image.tmdb.org/t/p/w500${image}`,
      synopsis : movie.overview,
      note : movie.vote_average,
      votes : movie.vote_count,
    }
  });  
  res.json(movieList);
});

//ADD WishlistMovie
router.post('/wishlist_movie', async function(req, res, next) {
var newWishListMovie  = new MovieWishListModel(
  {
    img: req.body.img,
    title: req.body.title,
  }
)
var newMovieSaved = await newWishListMovie.save();
// var wishList = await cityModel.find();
var result = false;
if(newMovieSaved){
  result = true;
}
//RES.JSON
res.json({result, newMovieSaved});
});

//DELETE WishlistMovie
router.delete('/wishlist_movie/:name', async function(req, res, next) {

var returnDB =  await MovieWishListModel.deleteOne({title : req.params.name})

var result = false
if(returnDB.deletedCount === 1) {
  result = true
}
  res.json({ result });
  });

  router.get('/wishlist_movie', async function(req, res, next) {
var wishList = await MovieWishListModel.find();
console.log(wishList);
    res.json(wishList)
  });






module.exports = router;
