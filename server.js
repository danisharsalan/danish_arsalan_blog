var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect('mongodb://localhost/blogjan2018', { useMongoClient: true });
mongoose.Promise = global.Promise;
var PostSchema = mongoose.Schema({
    title: {type: String, require: true},
    body: String,
    tag: {type: String, enum: ['Technology', 'Development', 'Society']},
    posted: {type: Date, default: Date.now}
}, {collection: 'post'});

var PostModel = mongoose.model("PostModel", PostSchema);

app.post("/api/blogpost", createPost);

function createPost(req, res){
    var post = req.body;
    console.log(post);
    PostModel
        .create(post)
        .then(
            function(postObj){
                res.json(200);
            },
            function (error){
                res.sendStatus(400);
            }
        );
}

app.listen(3000);