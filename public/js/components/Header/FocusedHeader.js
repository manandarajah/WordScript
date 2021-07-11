class FocusedHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      element_id: props.element_id,
      val: props.val,
      size: props.size
    };

    //Storing constructor props data into class variable props. This is used purely for mounting purposes
    this.props = props;

    // this.handleDataTransfer = this.handleDataTransfer.bind(this);
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
    var new_value = $(event.target).val();

    if (new_value === "") return;

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var new_value_encrypted_data = new_value.split('');
    var breakPoint = parseInt(Math.random() * new_value.length);

    for (var i = 0; i < new_value.length; ++i) {
      new_value_encrypted_data[parseInt(Math.random() * new_value_encrypted_data.length)] = characters[parseInt(Math.random() * characters.length)];

      if (i == breakPoint) break;
    }

    new_value_encrypted_data = window.btoa(new_value_encrypted_data);
    new_value_encrypted_data = new_value_encrypted_data.replace(/[^0-9&^A-Z&^a-z]/g, '');

    this.setState({
      element_id: new_value_encrypted_data,
      val: new_value
    });
  }

  handleSizeChange(event) {
    let size = this.state.size

    if (event.deltaY < 0 && size > 1) --size;
    else if (event.deltaY > 0 && size < 6) ++size;

    this.setState({
      size: size
    });
  }

  render() {
    return(
      <div id={this.state.element_id} class="header" onWheel={this.handleSizeChange}
        onMouseOver={() => this.props.displayDeleteButton()} onMouseOut={() => this.props.clearDeleteButton()}>
        <button type="button" class="btn btn-danger" onClick={() => this.props.deleteComponent()}>
          <i class="fas fa-times"></i>
        </button>
        <input type='text' onBlur={() => this.props.elementFocusedTransistor(event)} onChange={this.handleChange} class='form-control' value={this.state.val} />
        <span>{this.state.size}</span>
      </div>
    );
  }
}
