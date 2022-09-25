var mongoose = require('mongoose');
var config = require("../config")

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
    }
    mongoose.connect(`mongodb+srv://admin:${config.DB_KEY}.sgrgl.mongodb.net/mymovizapp?retryWrites=true&w=majority`,
        options,        
        function(err) { if (err){
        console.log(err);
        } else {
            console.log('bien connecté')
        }
        }
    );