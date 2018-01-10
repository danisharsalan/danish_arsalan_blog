(function(){
    angular
        .module("BlogApp", [])
        .controller("BlogController", BlogController);
    
    function BlogController($scope, $http){
        $scope.createPost = createPost;
        $scope.deletePost = deletePost;
        $scope.editPost = editPost;
        $scope.updatePost = updatePost;

        function init(){
            getAllPosts();
        }
        init();

        function updatePost(post){
            console.log(post);
            $http
                .put("/api/blogpost/" + post._id, post)
                .success(getAllPosts);
        }

        function editPost(postID){
            $http
                .get("/api/blogpost/" + postID)
                .success(function(post){
                    $scope.post = post;
                });
        }

        function deletePost(postID){
            $http
                .delete("/api/blogpost/" + postID)
                .success(getAllPosts);
        }

        function getAllPosts(){
            $http
                .get("/api/blogpost")
                .success(function(posts){
                    $scope.posts = posts;
                });
        }

        function createPost(post){
            console.log(post);
            $http
                .post("/api/blogpost", post)
                .success(getAllPosts);
        }
    }
})();