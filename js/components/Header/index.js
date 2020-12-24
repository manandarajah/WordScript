class Header extends React.Component {
//function Header(props) {

  /*const [header, setHeader] = React.useState({
    id: "",
    size: props.id,
    val: ""
  });

  var isElementFocused = false;*/

  constructor(props) {
    super(props);

    this.state = {
      type: "Header",
      position: props.position,
      id: "",
      size: 1,
      val: ""
    };

    //This variable is used to handle component functionality when it is mounted or unmounted
    this.mounted = true;

    //Controls wheather the element is focused on for editing or not
    this.isElementFocused = true;

    setInterval(() => {
        if (this.mounted)
          this.state.position = $(ReactDOM.findDOMNode(this)).position();

        this.props.onDataTransfer(props.index, this.state);
    }, 100);

    this.handleChange = this.handleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.elementFocusedTransistor = this.elementFocusedTransistor.bind(this);
  }

  componentDidMount() {
    let position = this.state.position;

    $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
  }

  //getSnapshotBeforeUpdate() {} //Before a component update, you'd want to call this method

  componentDidUpdate() {
    let position = this.state.position;

    if (this.mounted) {
      $(ReactDOM.findDOMNode(this)).css({"position": "absolute", "top": position.top, "left": position.left});
      $(ReactDOM.findDOMNode(this)).draggable();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  elementFocusedTransistor(event) {
    //this.setState({
      this.isElementFocused = $(event.target).hasClass("ws-component") ? true : false
    //});
  }

  handleChange(event) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var newVal = $(event.target).val();
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
        id: newValEnc,
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

  addComponentProperties(newDataObj) {
    this.state.id = newDataObj.id;
    //props.onAdd(header);
    setHeader({
      id: "",
      size: 0,
      val: ""
    });
  }

  render() {
    if (this.isElementFocused) {
      return(
        <div onWheel={this.handleSizeChange} id='hNumInput'>
          <input type='text' onBlur={this.elementFocusedTransistor} onChange={this.handleChange} class='form-control' value={this.state.val} />
          <span>{this.state.size}</span>
        </div>
      );
    }

    else {
      switch (this.state.size) {
        case 1:
          return (<h1 id={this.state.id} onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h1>);
          break;
        case 2:
          return (<h2 id={this.state.id} onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h2>);
          break;
        case 3:
          return (<h3 id={this.state.id} onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h3>);
          break;
        case 4:
          return (<h4 id={this.state.id} onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h4>);
          break;
        case 5:
          return (<h5 id={this.state.id} onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h5>);
          break;
        case 6:
          return (<h6 id={this.state.id} onClick={this.elementFocusedTransistor}
                    class='ws-component header'>{this.state.val}</h6>);
          break;
        }
        //$(".header").draggable();
    }
  }
}
