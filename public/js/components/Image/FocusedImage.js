class FocusedImage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      element_id: props.element_id,
      path: props.path,
      size: props.size
    };

    this.current_image = "";

    this.handleChange = this.handleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);

    setInterval(() => {if (this.state != null) props.OnReceive(this.state) }, 100);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleChange, false);
    document.removeEventListener("change", this.handleSizeChange, false);
    this.state = null;
  }

  handleChange(event) {
    var new_value = $(event.target)[0].currentSrc;

    if (new_value === "") return;

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var new_value_encrypted_data = new_value.split('');
    var breakPoint = parseInt(Math.random() * new_value.length);

    $(event.target).parent().css("background-color", "blue");

    if (this.current_image !== "") {
      $(this.current_image).parent().css("background-color", "white");
    }
    this.current_image = event.target;

    for (var i = 0; i < new_value.length; ++i) {
      new_value_encrypted_data[parseInt(Math.random() * new_value_encrypted_data.length)] = characters[parseInt(Math.random() * characters.length)];

      if (i == breakPoint) break;
    }

    new_value_encrypted_data = window.btoa(new_value_encrypted_data);
    new_value_encrypted_data = new_value_encrypted_data.replace(/[^0-9&^A-Z&^a-z]/g, '');

    this.setState({
      element_id: new_value_encrypted_data,
      path: new_value
    });
  }

  handleSizeChange() {
    this.setState({
      size: {
        width: parseInt($("#width").val()),
        height: parseInt($("#height").val())
      }
    });
  }

  render() {
    return(
      <div id={this.state.element_id} onMouseOver={() => this.props.displayDeleteButton()} onMouseOut={() => this.props.clearDeleteButton()}>
        <button type="button" class="btn btn-danger" onClick={() => this.props.deleteComponent()}>
          <i class="fas fa-times"></i>
        </button>
        <table onClick={this.handleChange} class="table table-bordered col-sm-1">
          <tbody>
            <tr>
              <td><img src="../../../images/cycle.jpg"/></td>
              <td><img src="../../../images/desert.jpg"/></td>
              <td><img src="../../../images/land.jpg"/></td>
            </tr>
            <tr>
              <td><img src="../../../images/landandwater.jpg"/></td>
              <td><img src="../../../images/milkyway.jpg"/></td>
              <td><img src="../../../images/surf.jpg"/></td>
            </tr>
          </tbody>
        </table>
        Width: <input id="width" type="range" onChange={this.handleSizeChange}
                  class="form-control-range" value={this.state.size.width}/>
        Height: <input id="height" type="range" onChange={this.handleSizeChange}
                  class="form-control-range" value={this.state.size.height}/>
        <button type="button" class="btn btn-primary" onClick={() => this.props.elementFocusedTransistor(event)}>
          Switch
        </button>
      </div>
    );
  }
}
