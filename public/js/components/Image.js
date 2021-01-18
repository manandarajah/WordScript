class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      type: "Image",
      position: props.position,
      eId: "image",
      path: "",
      size: {
        width: 50,
        height: 50
      },
      canDelete: false
    };

    this.props = props;

    //This variable is used to handle component functionality when it is mounted or unmounted
    this.mounted = true;

    this.type = "Image";

    this.canEdit = props.canEdit;

    //Controls wheather the element is focused on for editing or not
    this.isElementFocused = props.initElementFocused != null ? false : true;

    this.currentImage = "";

    setInterval(() => {
        if (this.mounted && this.canEdit) {
          if (this.state != null)
            this.state.position = $(ReactDOM.findDOMNode(this)).position();

          this.props.onDataTransfer(this.state, this.type);
          if (this.state.canDelete) this.props.onDelete(this.state.id, this.type);
        }
    }, 100);

    this.elementFocusedTransistor = this.elementFocusedTransistor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.displayDeleteButton = this.displayDeleteButton.bind(this);
    this.clearDeleteButton = this.clearDeleteButton.bind(this);
    this.deleteComponent = this.deleteComponent.bind(this);
  }

  componentDidMount() {

    if (this.props.eId != null) this.setState({ eId: this.props.eId });
    if (this.props.path != null) this.setState({ path: this.props.path });
    if (this.props.size != null) this.setState({ size: this.props.size });

    let position = this.state.position;

    $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
    $("#"+this.state.eId+" > .btn-danger").css("display", "none");
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

      if (this.canEdit) {
        $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
        $(ReactDOM.findDOMNode(this)).draggable();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.isElementFocused = false;
    this.currentImage = null;
    this.props = null;
    document.removeEventListener("mouseover", this.displayDeleteButton, false);
    document.removeEventListener("mouseout", this.clearDeleteButton, false);
    document.removeEventListener("click", this.handleChange, false);
    document.removeEventListener("change", this.handleSizeChange, false);
    document.removeEventListener("click", this.deleteComponent, false);
    document.removeEventListener("click", this.elementFocusedTransistor, false);

    console.log("Image component unmounted");
  }

  elementFocusedTransistor(event) {
    //this.setState({
    if (this.canEdit)
      this.isElementFocused = $(event.target).hasClass("ws-component") ? true : false;
    //});
  }

  handleChange(event) {
    var newVal = $(event.target)[0].currentSrc;

    if (newVal === "") return;

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var newValEnc = newVal.split('');
    var breakPoint = parseInt(Math.random() * newVal.length);

    $(event.target).parent().css("background-color", "blue");

    if (this.currentImage !== "") {
      $(this.currentImage).parent().css("background-color", "white");
    }
    this.currentImage = event.target;

    for (var i = 0; i < newVal.length; ++i) {
      newValEnc[parseInt(Math.random() * newValEnc.length)] = characters[parseInt(Math.random() * characters.length)];

      //if (breakPoint % 2 == 0) newValEnc[i] = characters[parseInt(Math.random() * characters.length)];

      if (i == breakPoint) break;
    }

    newValEnc = window.btoa(newValEnc);
    newValEnc = newValEnc.replace(/[^0-9&^A-Z&^a-z]/g, '');

    //if ($(event.target).val() !== "") {
      this.setState({
        eId: newValEnc,
        path: newVal
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

  displayDeleteButton() {
    if (this.canEdit)
      $("#"+this.state.eId+" > .btn-danger").css("display", "inline");
  }

  clearDeleteButton() {
    $("#"+this.state.eId+" > .btn-danger").css("display", "none");
  }

  deleteComponent() {
    //ReactDOM.unmountComponentAtNode(document.getElementById("imgDiv"));
    this.state.canDelete = true;
  }

  render() {
    if (this.isElementFocused) {
      return(
        <div id={this.state.eId} onMouseOver={this.displayDeleteButton} onMouseOut={this.clearDeleteButton}>
          <button type="button" class="btn btn-danger" onClick={this.deleteComponent}>
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
          <button type="button" class="btn btn-primary" onClick={this.elementFocusedTransistor}>
            Switch
          </button>
        </div>
      );
    }

    else {
      return(<div id={this.state.eId} onMouseOver={this.displayDeleteButton} onMouseOut={this.clearDeleteButton}>
                <button type="button" class="btn btn-danger" onClick={this.deleteComponent}>
                  <i class="fas fa-times"></i>
                </button>
                <img class="ws-component" onClick={this.elementFocusedTransistor} src={this.state.path} />
            </div>);
    }
  }
}
