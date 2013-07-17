
$(function(){


  var baseurl = "";

  if($.cookie('baseurl') === undefined){
    $.cookie("baseurl", "http://localhost:3000/api/")
  }
  $("input#baseurl").val($.cookie("baseurl"));
  baseurl = $.cookie("baseurl");

  $("input#baseurl").on("change", function(){
    $.cookie("baseurl", $(this).val());
    baseurl = $.cookie("baseurl");
  });


  
  var noPropagation = function(e) {
    e.stopPropagation();
    if (e.preventDefault) {
      return e.preventDefault();
    } else {
      return e.returnValue = false;
    }
  };

  function handleFile(e){

    var files = e.originalEvent.dataTransfer.files;
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
      reader.onload = (function(aFile) { postImage(aFile.currentTarget.result); });
      reader.readAsDataURL(files[i]);
      
      // Read the File objects in this FileList.
    }
  }

  $('div#dropzone').on('drop',function(e){
    e.originalEvent.stopPropagation();
    e.originalEvent.preventDefault();
    handleFile(e);
    $(this).removeClass("hover");
  }).on('dragover', function (e) {
    e.preventDefault();
    $(this).addClass("hover");
  }).on('dragleave', function (e) {
    e.preventDefault();
    $(this).removeClass("hover");
  });

  function getScreens(){

    $.ajax(baseurl+"screens", {success:function(data){
      console.log("screens", data);
    }, dataType:"json"})
  }

  function postImage(imageData){

    var data = {action:"image", url:imageData}
    $("#dropzone").html('Sending...');

    $("img#preview").attr("src", imageData);


    $.ajax(baseurl+"screens/all", {method:"POST", data:data, success:function(ret){
      if(ret.status === "ok")
        $("#dropzone").html('Sent!');
      setTimeout(function(){$("#dropzone").html('Drop here!');}, 5000);
    }, dataType:"json"})
  }

  getScreens();



});

