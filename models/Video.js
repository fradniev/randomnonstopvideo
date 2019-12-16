const mongoose = require('mongoose');
const {Schema} = mongoose;

const videoSchema = new Schema({
    name: String,
    link: String,
    season: String,
});

mongoose.model('videos', videoSchema)