class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      type: "Image",
      position: props.position,
      element_id: "image",
      path: "",
      size: {
        width: 50,
        height: 50
      },
      can_delete: false
    };

    if (props.element_id != null) {
      this.state = {
        id: props.id,
        type: "Image",
        position: props.position,
        element_id: props.element_id,
        path: props.path,
        size: props.size,
        can_delete: false
      };
    }

    this.props = props;

    //This variable is used to handle component functionality when it is mounted or unmounted
    this.mounted = true;

    this.type = "Image";

    this.is_edit_permission_granted = props.is_edit_permission_granted;

    //Controls wheather the element is focused on for editing or not
    this.is_element_focused = props.init_element_focused != null ? false : true;

    setInterval(() => {
        if (this.mounted && this.is_edit_permission_granted) {
          if (this.state != null)
            this.state.position = $(ReactDOM.findDOMNode(this)).position();

          this.props.onDataTransfer(this.state, this.type);
          if (this.state.can_delete) this.props.onDelete(this.state.id, this.type);
        }
    }, 100);

    this.handleDataReceive = this.handleDataReceive.bind(this);
    this.elementFocusedTransistor = this.elementFocusedTransistor.bind(this);
    this.displayDeleteButton = this.displayDeleteButton.bind(this);
    this.clearDeleteButton = this.clearDeleteButton.bind(this);
    this.deleteComponent = this.deleteComponent.bind(this);
  }

  componentDidMount() {

    // if (this.props.element_id != null) this.setState({ element_id: this.props.element_id });
    // if (this.props.path != null) this.setState({ path: this.props.path });
    if (this.props.size != null) this.setState({ size: this.props.size });

    let position = this.state.position;

    $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
    $("#"+this.state.element_id+" > .btn-danger").css("display", "none");
  }

  //getSnapshotBeforeUpdate() {} //Before a component update, you'd want to call this method

  componentDidUpdate() {
    if (this.mounted) {
      let position = this.state.position;

      if ($(ReactDOM.findDOMNode(this)).children().is("img")) {
        $(ReactDOM.findDOMNode(this)).children().width(this.state.size.width+"pc");
        $(ReactDOM.findDOMNode(this)).children().height(this.state.size.height+"pc");
      }

      $(".btn-danger").width(11);
      $(".btn-danger").height(24);

      if (this.is_edit_permission_granted) {
        $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
        $(ReactDOM.findDOMNode(this)).draggable();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.is_element_focused = false;
    this.current_image = null;
    this.props = null;
    document.removeEventListener("mouseover", this.displayDeleteButton, false);
    document.removeEventListener("mouseout", this.clearDeleteButton, false);
    document.removeEventListener("click", this.deleteComponent, false);
    document.removeEventListener("click", this.elementFocusedTransistor, false);

    console.log("Image component unmounted");
  }

  handleDataReceive(data) {
    this.setState({
      element_id: data.element_id,
      path: data.path,
      size: data.size
    });
  }

  elementFocusedTransistor(event) {
    //this.setState({
    if (this.is_edit_permission_granted)
      this.is_element_focused = $(event.target).hasClass("ws-component") ? true : false;
    //});
  }

  displayDeleteButton() {
    if (this.is_edit_permission_granted)
      $("#"+this.state.element_id+" > .btn-danger").css("display", "inline");
  }

  clearDeleteButton() {
    $("#"+this.state.element_id+" > .btn-danger").css("display", "none");
  }

  deleteComponent() {
    //ReactDOM.unmountComponentAtNode(document.getElementById("imgDiv"));
    this.state.can_delete = true;
  }

  render() {
    let image = this.state;

    if (this.is_element_focused) {
      return(
        <FocusedImage element_id={image.element_id}
                      path={image.path}
                      size={image.size}
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
        <DisplayImage element_id={image.element_id}
                      path={image.path}
                      size={image.size}
                      elementFocusedTransistor={this.elementFocusedTransistor}
                      displayDeleteButton={this.displayDeleteButton}
                      clearDeleteButton={this.clearDeleteButton}
                      deleteComponent={this.deleteComponent}
                      OnReceive={this.handleDataReceive}
        />
      );
    }
  }
}
