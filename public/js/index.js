$(document).ready(function() {

  //var focusedElement;
  //var scrollVal = 1;

  console.log(React);
  console.log(ReactDOM);
  console.log(ReactRouterDOM);
  console.log(ReactDraggable);

  console.log(user);

  var react_app = ReactDOM.render(<App />, document.getElementsByClassName("container-fluid")[0]);

  setInterval(() => {
    //send components into a route, that route will pass the components data into a global server-side variable,
    //one that I can use to make comparisons to decide weather to insert or update a record
    $.post(dir, {components: components}, function(data) {
      console.log("great success");
    });
  }, 100);

  //Handles selected element change
  $("li").click(function(e) {
    wordscript_selected_create_component_type = $(e.target).attr("id");
    $(".active").removeClass("active");
    $(e.target).parent().addClass("active");
    console.log(wordscript_selected_create_component_type);
  });

  $("#copylink").click(function() {
    var linkview = document.getElementsByName("linkview")[0];
    linkview.style.display = "inline";
    console.log(linkview.value);
    linkview.select();
    linkview.setSelectionRange(0, 99999);
    document.execCommand("copy");
    linkview.style.display = "none";
    //selection.removeAllRanges();
    //alert("Copied link to clipboard: " + linkview.value);
  });

  //Manages content directly on webpage
  $(".container-fluid").dblclick(function(e) {

      //Adds a component to the webpage when the div tag double click event is invoked and if it's on an empty space
      if (!$(e.target).hasClass("ws-component") && is_edit_permission_granted) {

          var new_component_obj = {
            position: {
              top: e.clientY - component_off_set_values_map.get(wordscript_selected_create_component_type).yOffset,
              left: e.clientX - component_off_set_values_map.get(wordscript_selected_create_component_type).xOffset
            }
          };

        //This code calls anonymous function stored in key 'wordscript_selected_create_component_type'
        react_app.addComponent(new_component_obj, wordscript_selected_create_component_type);
      }
  });
});
