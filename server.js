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
app.get("/api/blogpost", getAllPosts);
app.get("/api/blogpost/:id", getPostByID);
app.delete("/api/blogpost/:id", deletePost);
app.put("/api/blogpost/:id", updatePost);

function updatePost(req, res){
    var postID = req.params.id;
    var post = req.body;
    PostModel
        .update({_id: postID}, {
            title: post.title,
            body: post.body
        })
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(400);
            }
        );
}

function getPostByID(req, res){
    var postID = req.params.id;
    PostModel
        .findById(postID)
        .then(
            function(post){
                res.json(post);
            },
            function(error){
                res.sendStatus(400);
            }
        );
}

function deletePost(req, res){
    var postID = req.params.id;
    PostModel
        .remove({_id: postID})
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(400);
            }
        );
}

function getAllPosts(req, res){
    PostModel
        .find()
        .then(
            function(posts){
                res.json(posts);
            },
            function(error){
                res.sendStatus(400);
            }
        );
}

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