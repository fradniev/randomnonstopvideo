const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(`mongodb://localhost:27017/randomnonstopvideo`, {useNewUrlParser:true});
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});