class Header extends React.Component {
//function Header(props) {

  /*const [header, setHeader] = React.useState({
    eId: "",
    size: props.eId,
    val: ""
  });

  var isElementFocused = false;*/

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      type: "Header",
      position: props.position,
      eId: "header",
      size: 1,
      val: "",
      canDelete: false
    };

    //Storing constructor props data into class variable props. This is used purely for mounting purposes
    this.props = props;

    this.type = "Header";

    this.canEdit = props.canEdit;

    //Store HTML content
    this.content;

    //This variable is used to handle component functionality when it is mounted or unmounted
    this.mounted = true;

    //Controls wheather the element is focused on for editing or not
    this.isElementFocused = props.initElementFocused != null ? false : true;

    setInterval(() => {
        if (this.mounted && this.canEdit) {
          if (this.state != null)
            this.state.position = $(ReactDOM.findDOMNode(this)).position();

          this.props.onDataTransfer(this.state, this.type);
          if (this.state.canDelete) this.props.onDelete(this.state.id, this.type);
        };
    }, 100);

    this.handleChange = this.handleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.elementFocusedTransistor = this.elementFocusedTransistor.bind(this);
    this.displayDeleteButton = this.displayDeleteButton.bind(this);
    this.clearDeleteButton = this.clearDeleteButton.bind(this);
    this.deleteComponent = this.deleteComponent.bind(this);
  }

  componentDidMount() {
    if (this.props.eId != null) this.setState({ eId: this.props.eId });
    if (this.props.size != null) this.setState({ size: this.props.size });
    if (this.props.val != null) this.setState({ val: this.props.val });

    let position = this.state.position;

    $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
    $("#"+this.state.eId+" > .btn-danger").css("display", "none");
  }

  //getSnapshotBeforeUpdate() {} //Before a component update, you'd want to call this method

  componentDidUpdate() {
    if (this.canEdit) {
      let position = this.state.position;

      if (this.mounted) {
        $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
        $(ReactDOM.findDOMNode(this)).draggable();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.isElementFocused = false;
    this.state = null;
    this.props = null;
    document.removeEventListener("mouseover", this.displayDeleteButton, false);
    document.removeEventListener("mouseout", this.clearDeleteButton, false);
    document.removeEventListener("click", this.handleChange, false);
    document.removeEventListener("change", this.handleSizeChange, false);
    document.removeEventListener("click", this.deleteComponent, false);
    document.removeEventListener("click", this.elementFocusedTransistor, false);

    console.log("Header component unmounted");
  }

  elementFocusedTransistor(event) {
    //this.setState({
    if (this.canEdit)
      this.isElementFocused = $(event.target).hasClass("ws-component") ? true : false
    //});
  }

  handleChange(event) {
    var newVal = $(event.target).val();

    if (newVal === "") return;

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var newValEnc = newVal.split('');
    var breakPoint = parseInt(Math.random() * newVal.length);

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
        val: newVal
      });
    //}
  }

  handleSizeChange(event) {
    let size = this.state.size

    if (event.deltaY < 0 && size > 1) --size;
    else if (event.deltaY > 0 && size < 6) ++size;

    this.setState({
      size: size
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
    //ReactDOM.unmountComponentAtNode(document.getElementByeId("imgDiv"));
    this.state.canDelete = true;
  }

  render() {
    if (this.isElementFocused) {
      return(
        <div id={this.state.eId} class="header" onWheel={this.handleSizeChange} onMouseOver={this.displayDeleteButton} onMouseOut={this.clearDeleteButton}>
          <button type="button" class="btn btn-danger" onClick={this.deleteComponent}>
            <i class="fas fa-times"></i>
          </button>
          <input type='text' onBlur={this.elementFocusedTransistor} onChange={this.handleChange} class='form-control' value={this.state.val} />
          <span>{this.state.size}</span>
        </div>
      );
    }

    else {
      switch (this.state.size) {
        case 1:
          this.content = <h1 onClick={this.elementFocusedTransistor}
                    class='ws-component'>{this.state.val}</h1>;
          break;
        case 2:
          this.content = <h2 onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h2>;
          break;
        case 3:
          this.content = <h3 onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h3>;
          break;
        case 4:
          this.content = <h4 onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h4>;
          break;
        case 5:
          this.content = <h5 onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h5>;
          break;
        case 6:
          this.content = <h6 onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h6>;
          break;
        }

        return(
          <div id={this.state.eId} onMouseOver={this.displayDeleteButton} onMouseOut={this.clearDeleteButton}>
            <button type="button" class="btn btn-danger" onClick={this.deleteComponent}>
              <i class="fas fa-times"></i>
            </button>
            {this.content}
          </div>
        );
    }
  }
}
