$(document).ready(function() {

  //var focusedElement;
  var scrollVal = 1;
  //var position;
  /*var yOffset = 20;
  var xOffset = 200;*/
  var selectedComponent = "";

  console.log(React);
  console.log(ReactDOM);
  console.log(ReactRouterDOM);
  console.log(ReactDraggable);

  var app = ReactDOM.render(<App />, document.getElementsByClassName("container-fluid")[0]);

  //Map of component offset data
  var componentOffsets = new Map();
  componentOffsets.set("header", {xOffset: 200, yOffset: 20});
  componentOffsets.set("image", {xOffset: 400, yOffset: 140});

  var components = new Map();
  components.set("header", (newObj) => {app.addHeader(newObj);});
  components.set("image", (newObj) => {app.addImage(newObj);});

  //ReactDOM.render(<h1>This is from React</h1>, document.getElementsByClassName("container-fluid")[0]);

  //Stores an input tag to replace target tag with
  //var inputTag = "<div id='hNumInput'><input type='text' class='form-control' /><span></span></div>";

  //Handles selected element change
  $("li").click(function(e) {
    selectedComponent = $(e.target).attr("id");
    $(".active").removeClass("active");
    $(e.target).parent().addClass("active");
  });

//Manages content directly on webpage
  $("div").dblclick(function(e) {

      //Adds a title tag to the webpage when the div tag double click event is invoked
      if (!$(e.target).hasClass("ws-component")) {
        /*indexBefore = $("h1:nth-child("+($(this).index() - 1)+")");
        indexAfter = $("h1:nth-child("+($(this).index() + 1)+")");

        console.log(indexBefore);
        console.log(indexAfter);*/

        /*switch (selectedComponent) {
          case "header":
            yOffset = 20;
            xOffset = 200;
            break;
          case "image":
            yOffset = 140;
            xOffset = 400;
            break;
        }*/

        //$(this).append(inputTag);
        //focusedElement = ReactDOM.render(React.createElement(Header, { size: 1}), document.getElementsByClassName("container-fluid")[0]);
        var newObj = {
            //isElementFocused: true,
            //size: 1,
            position: {
              top: e.clientY - componentOffsets.get(selectedComponent).yOffset,
              left: e.clientX - componentOffsets.get(selectedComponent).xOffset
            }
          };

        /*switch (selectedComponent) {
          case "header":
            app.addHeader(newObj);
            break;
          case "image":
            app.addImage(newObj);
            break;
        }*/

        //This code calls anonymous function stored in key 'selectedComponent'
        components.get(selectedComponent)(newObj);
        //console.log(focusedElement);
        //window.elementFocused = true;
        //focusedElement.elementFocusedTransistor();
        //$("#hNumInput").css({"position": "absolute", "top": e.clientY - yOffset, "left": e.clientX - xOffset});
        //$("#hNumInput > span").text(1);

        //position = $("#hNumInput").position();
        //elementFocused = true;
      }
  });

  //Changes title into textbox when focused on so users can edit their title in a convenient manner
  /*$("div").on("click", ".header", function() {

    if (focusedElement != null && !window.elementFocused) {
      //Extracts current text in the tag
      position = $(this).position();
      var currentVal = $(this).text();

      //Replace content tag with input tag
      //$(this).replaceWith(inputTag);

      //Set elementFocused to true to indicate that user is focusing on a specific element
      window.elementFocused = false;
      //focusedElement.elementFocusedTransistor();

      $("#hNumInput").css({"position": "absolute", "top": position.top, "left": position.left});
      //$("#hNumInput > span").text(scrollVal);

      //Place current tag value in the input box
      //$("input").val(currentVal);
    }
  });*/

  //Changes textbox into title when focus is lost to display title change
  //$("div").on("focusout", "input", function() {

    //Extracts new value from input tag
    /*var newVal = $(this).val();
    var newValEnc = newVal;
    var tagNum = parseInt($("#hNumInput > span").text());*/

    //If newVal actually has a value, then add content tag with said value
    /*var newDataObj = {
      id: newValEnc,
      size: tagNum,
      val: newVal
    };*/

    //Replace input tag with content tag
    //$("#hNumInput").replaceWith(hTag);
    //window.elementFocused = false;
    //app.elementFocusedTransistor();

    //if (position != null) $("#"+newValEnc).css({"position": "absolute", "top": position.top, "left": position.left});

    //Makes created content draggable
    //$(".header").draggable();

    //Set elementFocused to false to indicate that user is not focusing on a particular element
    //elementFocused = false;
  //});

  /*$(document).on("mousewheel", ".container-fluid", function(e) {

    //if (elementFocused) {
      if (e.originalEvent.wheelDelta > 0 && scrollVal > 1) --scrollVal;
      else if (e.originalEvent.wheelDelta < 0 && scrollVal < 6) ++scrollVal;

      $("#hNumInput > span").text(scrollVal);
    //}
  });*/
});
