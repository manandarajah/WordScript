class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "Image",
      position: props.position,
      id: "",
      path: "",
      size: {
        width: 50,
        height: 50
      }
    };

    this.props = props;

    //This variable is used to handle component functionality when it is mounted or unmounted
    this.mounted = true;

    //Controls wheather the element is focused on for editing or not
    this.isElementFocused = true;

    this.currentImage = "";

    setInterval(() => {
        if (this.mounted)
          this.state.position = $(ReactDOM.findDOMNode(this)).position();

        this.props.onDataTransfer(props.index, this.state);
    }, 100);

    this.elementFocusedTransistor = this.elementFocusedTransistor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  componentDidMount() {

    if (this.props.id != null) this.setState({ id: props.id });
    if (this.props.path != null) this.setState({ path: props.path });
    if (this.props.width != null) this.setState({ size: { width: props.width }});
    if (this.props.height != null) this.setState({ size: { height: props.height }});

    let position = this.state.position;

    $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
  }

  //getSnapshotBeforeUpdate() {} //Before a component update, you'd want to call this method

  componentDidUpdate() {
    let position = this.state.position;

    if (this.mounted) {
      if ($(ReactDOM.findDOMNode(this)).is("img")) {
        $(ReactDOM.findDOMNode(this)).width(this.state.size.width+"%");
        $(ReactDOM.findDOMNode(this)).height(this.state.size.height+"%");
      }

      $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
      $(ReactDOM.findDOMNode(this)).draggable();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  elementFocusedTransistor(event) {
    //this.setState({
      this.isElementFocused = $(event.target).hasClass("ws-component") ? true : false;
    //});
  }

  handleChange(event) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var newVal = $(event.target)[0].currentSrc;
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
        id: newValEnc,
        path: newVal
      });
  }

  handleSizeChange() {
    this.setState({
      size: {
        width: $("#width").val(),
        height: $("#height").val()
      }
    });
  }

  render() {
    if (this.isElementFocused) {
      return(
        <div>
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
          <button type="button" class="btn btn-danger" onClick={this.elementFocusedTransistor}>
            <i class="fas fa-times"></i>
          </button>
        </div>
      );
    }

    else {
      return(<img id={this.state.id} onClick={this.elementFocusedTransistor}
                class="ws-component" src={this.state.path} />);
    }
  }
}
