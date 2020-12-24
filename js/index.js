$(document).ready(function() {

  //var focusedElement;
  var scrollVal = 1;
  var selectedComponent = "";

  console.log(React);
  console.log(ReactDOM);
  console.log(ReactRouterDOM);
  console.log(ReactDraggable);

  var app = ReactDOM.render(<App />, document.getElementsByClassName("container-fluid")[0]);

  //Map of component offset data
  var componentOffsets = new Map();
  componentOffsets.set("Header", {xOffset: 200, yOffset: 20});
  componentOffsets.set("Image", {xOffset: 400, yOffset: 140});

  //Handles selected element change
  $("li").click(function(e) {
    selectedComponent = $(e.target).attr("id");
    $(".active").removeClass("active");
    $(e.target).parent().addClass("active");
  });

  //Manages content directly on webpage
  $(".container-fluid").dblclick(function(e) {

      //Adds a component to the webpage when the div tag double click event is invoked and if it's on an empty space
      if (!$(e.target).hasClass("ws-component")) {

          var newObj = {
            position: {
              top: e.clientY - componentOffsets.get(selectedComponent).yOffset,
              left: e.clientX - componentOffsets.get(selectedComponent).xOffset
            }
          };

        //This code calls anonymous function stored in key 'selectedComponent'
        app.addComponent(newObj, selectedComponent);
      }
  });
});
