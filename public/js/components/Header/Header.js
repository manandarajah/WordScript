class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      type: "Header",
      position: props.position,
      element_id: "header",
      size: 1,
      val: "",
      can_delete: false
    };

    if (props.element_id != null) {
      this.state = {
        id: props.id,
        type: "Header",
        position: props.position,
        element_id: props.element_id,
        size: props.size,
        val: props.val,
        can_delete: false
      };
    }

    //Storing constructor props data into class variable props. This is used purely for mounting purposes
    this.props = props;

    this.type = "Header";

    this.is_edit_permission_granted = props.is_edit_permission_granted;

    //This variable is used to handle component functionality when it is mounted or unmounted
    this.mounted = true;

    //Controls wheather the element is focused on for editing or not
    this.is_element_focused = props.init_element_focused != null ? false : true;

    setInterval(() => {
        if (this.mounted && this.is_edit_permission_granted) {
          if (this.state != null)
            this.state.position = $(ReactDOM.findDOMNode(this)).position();

          this.props.onDataTransfer(this.state, this.type);
          if (this.state.can_delete) this.props.onDelete(this.state.id, this.type);
        };
    }, 100);

    this.handleDataReceive = this.handleDataReceive.bind(this)
    this.elementFocusedTransistor = this.elementFocusedTransistor.bind(this);
    this.displayDeleteButton = this.displayDeleteButton.bind(this);
    this.clearDeleteButton = this.clearDeleteButton.bind(this);
    this.deleteComponent = this.deleteComponent.bind(this);
  }

  componentDidMount() {
    let position = this.state.position;

    $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
    $("#"+this.state.element_id+" > .btn-danger").css("display", "none");

    console.log("header");
  }

  //getSnapshotBeforeUpdate() {} //Before a component update, you'd want to call this method

  componentDidUpdate() {
    if (this.is_edit_permission_granted) {
      let position = this.state.position;

      if (this.mounted) {
        $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
        $(ReactDOM.findDOMNode(this)).draggable();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.is_element_focused = false;
    this.state = null;
    this.props = null;
    document.removeEventListener("mouseover", this.displayDeleteButton, false);
    document.removeEventListener("mouseout", this.clearDeleteButton, false);
    document.removeEventListener("click", this.deleteComponent, false);
    document.removeEventListener("click", this.elementFocusedTransistor, false);

    console.log("Header component unmounted");
  }

  elementFocusedTransistor(event) {
    if (this.is_edit_permission_granted)
      this.is_element_focused = $(event.target).hasClass("ws-component") ? true : false
  }

  handleDataReceive(data) {
    this.setState({
      element_id: data.element_id,
      val: data.val,
      size: data.size
    });
  }

  displayDeleteButton() {
    if (this.is_edit_permission_granted)
      $("#"+this.state.element_id+" > .btn-danger").css("display", "inline");
  }

  clearDeleteButton() {
    $("#"+this.state.element_id+" > .btn-danger").css("display", "none");
  }

  deleteComponent() {
    this.state.can_delete = true;
  }

  render() {
    let header = this.state;

    if (this.is_element_focused) {
      return(
        <FocusedHeader element_id={header.element_id}
                       val={header.val}
                       size={header.size}
                       elementFocusedTransistor={this.elementFocusedTransistor}
                       displayDeleteButton={this.displayDeleteButton}
                       clearDeleteButton={this.clearDeleteButton}
                       deleteComponent={this.deleteComponent}
                       OnReceive={this.handleDataReceive}
        />
      );
    }

    else {
      return(
        <DisplayHeader element_id={header.element_id}
                       val={header.val}
                       size={header.size}
                       elementFocusedTransistor={this.elementFocusedTransistor}
                       displayDeleteButton={this.displayDeleteButton}
                       clearDeleteButton={this.clearDeleteButton}
                       deleteComponent={this.deleteComponent}
        />
      );
    }
  }
}
