var posts = []

//add posts to array
function addPost(text, id){
   var post =  {
      'text' : text,
      'id' : id,
      'comments' : []
    }
    
    posts.push(post)
}

//add posts to HTML
function updatePost(){
    $(".post-list").empty();

    for(i = 0; i < posts.length; i++){         
        $('.post-list').append('<li class="post" data-id="' + posts[i].id + '"> <button type="button" class="remove">REMOVE</button> ' + ' Name: ' + posts[i].text + ' Id: ' + posts[i].id + 
        '<input class="comment-input">   <button type="button" class="post-comment">Post Comment</button>' + '<div class="comment-section"></div>' +
        '</li>')

        renderComments(i, posts[i].id);

    } 
}

//add comments to HTML
function renderComments(index, dataId){
    //$('[data-test="the_exact_value"]')
    //add all of the comments to the page based on the index you recieve; 
    // $('.comment-section').empty()
    for(var j = 0; j < posts[index].comments.length; j++){
        
        $('[data-id="' + dataId + '"]').append('<p class="posted-comment">' + posts[index].comments[j].text + "<button type='button' class='remove-comment'>remove comment </button></p>");

    }
}


//add comment to it's posts array
function addComment(text, relevantPost){   
    var comment = {
        text: text
    }
     
      for(i = 0; i < posts.length; i++) {
        if(relevantPost == posts[i].id){
         posts[i].comments.push(comment)
        }
      }
      
}





//add post
$('.add-post').click(function(){
    var text = $('#post-name').val();
    var id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    
    addPost(text, id)
    updatePost()
  })


//post comment
$('body').on('click', '.post-comment', function(){
    var comment = $(this).prev().val()
    var relevantPost = $(this).parent().data().id
    addComment(comment, relevantPost) 
    updatePost()
})

//remove post
$('body').on('click', '.remove', function(){ 
    var comment = $('.post')
    var id = $(this).closest(post).data().id
     for(var i = 0; i < posts.length; i ++){
         
         if(id == posts[i].id){
             posts.splice(i, 1);
             $(this).closest(post).remove()
         }
 
     } 
 })

//remove comment
$('body').on('click', '.remove-comment', function(){

    //get HTML post & comment details
    var postId = $(this).closest('.post').data().id;
    var comment = $(this).closest('.posted-comment')
    var commentIndex = $(this).index();


    //find relevant post in array based on 'postId', then splice comment out based on 'commentIndex'
    for(i = 0; i < posts.length; i++){
        if(postId == posts[i].id){
            posts[i].comments.splice(commentIndex, 1);
            comment.remove();
            
        }
    }
})