class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: props.position
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

    this.elementFocusedTransistor = this.elementFocusedTransistor.bind(this);
  }

  componentDidMount() {
    /*setInterval(() => {
      this.setState({
        isElementFocused: window.elementFocused
      });
    }, 1000);*/

    /*document.addEventListener('wheel', this.handleSizeChange, false);
    document.addEventListener('change', this.handleChange, false);
    document.addEventListener('blur', this.elementFocusedTransistor, false);
    document.addEventListener('click', this.elementFocusedTransistor, false);*/

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
    /*document.removeEventListener('wheel', this.handleSizeChange, false);
    document.removeEventListener('change', this.handleChange, false);
    document.removeEventListener('blur', this.elementFocusedTransistor, false);
    document.removeEventListener('click', this.elementFocusedTransistor, false);*/
  }

  elementFocusedTransistor(event) {
    //this.setState({
      this.isElementFocused = $(event.target).hasClass("ws-component") ? true : false
    //});
  }

  render() {
    if (this.isElementFocused) {
      return(
        <table class="table table-bordered col-sm-1">
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
      );
    }

    else {

    }
  }
}
