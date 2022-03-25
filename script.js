$('document').ready(function () {
  var baseUrl_ = "https://51pilsvexd.execute-api.us-east-1.amazonaws.com/v1";
  var bucketName_ = "photo-store-cf";
  var apiKey_ = "SWpaQ1HDTn2ABpHwxt9Ss6mTQAdZiVQa2MrA0e7H";
    
  $("#x-search-form").on('submit', function (event) {
    event.preventDefault();
    var queryString = $("#transcript").val();
    $.ajax({
      url: baseUrl_ + "/search",
      type: "GET",
      data: {
        q: queryString
      },
      beforeSend: function(xhr){
        $('#x-result-txt').text(' ');
        $('#x-hrule').css('display', 'none');
        xhr.setRequestHeader('x-api-key', apiKey_);
      },
      error: function(res) {console.log(res)},
      success: function(res) { 
        console.log(res);
        var images = res['results'];
        var imgUrl = "";
        $('#x-grid-div').empty();
        if (images.length > 0){
          $('#x-result-txt').text('Search results for ' + queryString);
        }
        else {
          $('#x-result-txt').text('No results found');
        }
        
        $('#x-hrule').css('display', 'block');
        for (var i = 0; i < images.length; i++) {
          imgUrl = images[i]['url'];
          $('#x-grid-div').append('<a href="'+imgUrl+'" target="_blank"><img src="'+imgUrl+'" alt="" class="img-thumbnail img-style m-2"></a>');
        }
      }
   });
  });
  

  $("#x-file-upload").on('click', function (event) {
    event.preventDefault();

    var file = $("#x-file-input")[0].files[0];
    var fileName = file.name;
    var fileType = file.type;
    var customLabels = $("#labelinput").val();

    if (!customLabels || customLabels.length === 0 ) {
      customLabels = "";
    }

    $.ajax({
      url: baseUrl_ + "/upload/" + bucketName_+ "/" + fileName,
      type: "PUT",
      data: file,
      processData: false,
      cache: false,
      dataType: 'xml',
      beforeSend: function(xhr){
        $('#x-success-msg').text('')
        xhr.setRequestHeader('Content-Type', fileType);
        xhr.setRequestHeader('x-amz-meta-customLabels', customLabels);
        xhr.setRequestHeader('x-api-key', apiKey_);
      },
      error: function(res) {console.log(res)},
      success: function(res) { 
        $('#x-success-msg').text('File uploaded successfully!')
      }
    });

  });
});
