$(document).ready(function() {

  //var focusedElement;
  var scrollVal = 1;
  var selectedComponent = "";

  console.log(React);
  console.log(ReactDOM);
  console.log(ReactRouterDOM);
  console.log(ReactDraggable);

  console.log(user);

  var app = ReactDOM.render(<App />, document.getElementsByClassName("container-fluid")[0]);

  //Map of component offset data
  var componentOffsets = new Map();
  componentOffsets.set("Header", {xOffset: 200, yOffset: 20});
  componentOffsets.set("Image", {xOffset: 400, yOffset: 140});

  setInterval(() => {
    //send components into a route, that route will pass the components data into a global server-side variable,
    //one that I can use to make comparisons to decide weather to insert or update a record
    $.post(dir, {components: components}, function(data) {
      console.log("great success");
    });
  }, 100);

  //Handles selected element change
  $("li").click(function(e) {
    selectedComponent = $(e.target).attr("id");
    $(".active").removeClass("active");
    $(e.target).parent().addClass("active");
  });

  $("#copylink").click(function() {
    var copylink = document.getElementsByName("link")[0];
    copylink.style.display = "inline";
    console.log(copylink.value);
    copylink.select();
    copylink.setSelectionRange(0, 99999);
    document.execCommand("copy");
    copylink.style.display = "none";
    //selection.removeAllRanges();
    //alert("Copied link to clipboard: " + copylink.value);
  });

  //Manages content directly on webpage
  $(".container-fluid").dblclick(function(e) {

      //Adds a component to the webpage when the div tag double click event is invoked and if it's on an empty space
      if (!$(e.target).hasClass("ws-component") && canEdit) {

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
