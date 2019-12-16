const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Video');

const app = express();

mongoose.Promise = global.Promise;
const DBURI = process.env.MONGODB_URI || "mongodb://localhost:27017/randomnonstopvideo";

const options = {
    auth: {
        user: "fradniev",
        password: "Alex8596?"
    },
    useNewUrlParser:true,
    useUnifiedTopology: true
}

mongoose.connect(DBURI, options).then(()=>{
    console.log("connected");
},
(err)=>{
    console.log("err: ", err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/videoRoute')(app);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/built'));

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});