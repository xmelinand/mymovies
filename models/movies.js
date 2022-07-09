var mongoose = require('mongoose');

var movieWishListSchema = mongoose.Schema({
    img: String,
    title: String,

});

var MovieWishListModel = mongoose.model('wishListMovies', movieWishListSchema);

module.exports = MovieWishListModel;