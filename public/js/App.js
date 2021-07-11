class App extends React.Component {
//function App() {

  //const [headers, setHeaders] = React.useStates([]);

  constructor(props) {
    super(props);

    this.state = { //pass in the components data into here, assuming React will accept referencing another variable by value
      headers: headers,
      images: images
    };

    //A map of components list
    this.component_data_map = new Map();
    this.component_data_map.set("Header", this.state.headers);
    this.component_data_map.set("Image", this.state.images);

    //A map of anonymous functions used for editing existing components O(n) THIS CAN BE IMPROVED
    //How this works is that is gets a list from the map, iterate through each list 1 by 1 until it finds a match
    //and makes the change
    this.component_edit_anonymous_function_map = new Map();

     //this should edit one record in the map, optimizing the code from O(n) to O(1)
    this.component_edit_anonymous_function_map.set("Header", (h) => {return this.state.headers.set(h.id, h)});

    //this should edit one record in the map, optimizing the code from O(n) to O(1)
    this.component_edit_anonymous_function_map.set("Image", (img) => {return this.state.images.set(img.id, img)});

    //A map of anonymous functions updating components list onDataTransfer
    this.component_data_modify_anonymous_function_map = new Map();
    this.component_data_modify_anonymous_function_map.set("Header", (headers) => { this.setState({ headers: headers }); });
    this.component_data_modify_anonymous_function_map.set("Image", (images) => { this.setState({ images: images }); });

    this.handleDataTransfer = this.handleDataTransfer.bind(this);
    this.deleteComponent = this.deleteComponent.bind(this);
  }

  componentDidUpdate() {
    this.component_data_map.set("Header", this.state.headers);
    this.component_data_map.set("Image", this.state.images);
    components = {headers: Array.from(this.state.headers.values()), images: Array.from(this.state.images.values())};

    for (var i = 0; i < header_array_list.length; ++i)
      init_header_focused[i] = false;

    for (var i = 0; i < image_array_list.length; ++i)
      init_image_focused[i] = false;
  }

  addComponent(newObj, type) {
      let component_data = this.component_data_map.get(type);

      //What happens in a scenario, we have Header5, but we delete Header3 so now there's 4 headers. How do we handle the naming
      //convention here so it can be unique when we use it with maps
      newObj.id = type + component_data.size;
      component_data.set(newObj.id, newObj);
      this.component_data_modify_anonymous_function_map.get(type)(component_data);
  }

  handleDataTransfer(data, type) {
    let component_data = this.component_data_map.get(type);
    component_data = this.component_edit_anonymous_function_map.get(type)(data);
    this.component_data_modify_anonymous_function_map.get(type)(component_data);
  }

  deleteComponent(id, type) {
    let component_data = this.component_data_map.get(type);

    //From here - Code optimization improved from O(n) to possibly O(log(n))
    component_data.delete(id);
    var id_int_value = parseInt(id.substring(id.length - 1));

    if (id_int_value < component_data.size - 1) {
      for (var i = id_int_value; i < component_data.size + 1; ++i) {
          var old_id = type + "" + (i+1);
          var data = component_data.get(old_id);
          var new_id = type + "" + i;
          data.id = new_id;
          component_data.set(new_id, data);
          component_data.delete(old_id);
      }
      //To here
    }

    this.component_data_modify_anonymous_function_map.get(type)(component_data);
    $.post(dir + "delete", {id: id}, function(data) {
      console.log("Component deleted: " + id);
    });
  }

  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   return this.setState({ hasError: true });
  // }
  //
  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    let headers = Array.from(this.state.headers.values());
    let images = Array.from(this.state.images.values());

    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   throw new Error('Something went wrong');
    // }

    return(
      <div id="components" /*onDoubleClick={this.addComponent}*/>
        <section id="headers">
          {
            Object.keys(headers).map((h, index) => {

              var header = headers[h];

              return (
                <Header key={header.id}
                        id={header.id}
                        element_id={header.element_id}
                        position={header.position}
                        size={header.size}
                        val={header.val}
                        init_element_focused={init_header_focused[index]}
                        is_edit_permission_granted={is_edit_permission_granted}
                        onDataTransfer={this.handleDataTransfer}
                        onDelete={this.deleteComponent}/>
              );
            })

          }
        </section>
        <section id="images">
        {
          Object.keys(images).map((i, index) => {
          var image = images[i];

          return (
            <Image key={image.id}
                   id={image.id}
                   position={image.position}
                   element_id={image.element_id}
                   path={image.path}
                   size={image.size}
                   init_element_focused={init_image_focused[index]}
                   is_edit_permission_granted={is_edit_permission_granted}
                   onDataTransfer={this.handleDataTransfer}
                   onDelete={this.deleteComponent}/>
          );
        })}
        </section>
      </div>
    );
  }
}
