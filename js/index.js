$(document).ready(function() {

  var elementFocused = false;
  var scrollVal = 1;
  var position;
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var yOffset = 20;
  var xOffset = 200;

  //Stores an input tag to replace target tag with
  var inputTag = "<div id='hNumInput'><input type='text' class='form-control' /><span></span></div>";

//Manages content directly on webpage
  $("div").dblclick(function(e) {

      //Adds a title tag to the webpage when the div tag double click event is invoked
      if (!$(e.target).is("h1") && !elementFocused) {
        /*indexBefore = $("h1:nth-child("+($(this).index() - 1)+")");
        indexAfter = $("h1:nth-child("+($(this).index() + 1)+")");

        console.log(indexBefore);
        console.log(indexAfter);*/

        $(this).append(inputTag);
        $("#hNumInput").css({"position": "absolute", "top": e.clientY - yOffset, "left": e.clientX - xOffset});
        $("#hNumInput > span").text(1);

        position = $("#hNumInput").position();
        elementFocused = true;
      }
  });

  //Changes title into textbox when focused on so users can edit their title in a convenient manner
  $("div").on("click", ".header", function() {

    if (!elementFocused) {
      //Extracts current text in the tag
      position = $(this).position();
      var currentVal = $(this).text();

      for (scrollVal = 1; scrollVal <= 6; ++scrollVal)
        if ($(this).is("h"+scrollVal)) break;

      //Replace content tag with input tag
      $(this).replaceWith(inputTag);
      $("#hNumInput").css({"position": "absolute", "top": position.top, "left": position.left});
      $("#hNumInput > span").text(scrollVal);

      //Place current tag value in the input box
      $("input").val(currentVal);

      //Set elementFocused to true to indicate that user is focusing on a specific element
      elementFocused = true;
    }
  });

  //Changes textbox into title when focus is lost to display title change
  $("div").on("focusout", "input", function() {

    //Extracts new value from input tag
    var newVal = $(this).val();
    var newValEnc = newVal;
    var tagNum = parseInt($("#hNumInput > span").text());
    var breakPoint = parseInt(Math.random() * characters.length);
    var hTag = "";

    console.log(breakPoint);

    for (i = 0; i < newVal.length; ++i) {
      newValEnc += characters[parseInt(Math.random() * characters.length)];

      if (breakPoint % 2 == 0) newValEnc[i] = characters[parseInt(Math.random() * characters.length)];

      if (i == breakPoint) break;
    }

    newValEnc = window.btoa(newValEnc);
    newValEnc = newValEnc.replace(/[^0-9&^A-Z&^a-z]/g, '');

    //If newVal actually has a value, then add content tag with said value
    if (newVal !== "") hTag = "<h"+tagNum+" id='"+newValEnc+"' class='header'>"+newVal+"</h"+tagNum+">";

    //Replace input tag with content tag
    $("#hNumInput").replaceWith(hTag);

    if (position != null) $("#"+newValEnc).css({"position": "absolute", "top": position.top, "left": position.left});

    //Makes created content draggable
    $(".header").draggable();

    //Set elementFocused to false to indicate that user is not focusing on a particular element
    elementFocused = false;
  });

  $(document).on("mousewheel", ".container-fluid", function(e) {

    //if (elementFocused) {
      if (e.originalEvent.wheelDelta > 0 && scrollVal > 1) --scrollVal;
      else if (e.originalEvent.wheelDelta < 0 && scrollVal < 6) ++scrollVal;

      $("#hNumInput > span").text(scrollVal);
    //}
  });
});
