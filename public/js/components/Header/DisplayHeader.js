class DisplayHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      element_id: props.element_id,
      val: props.val,
      size: props.size
    };

    this.content = "";
  }

  componentWillUnmount() {
    this.state = null;
    this.content = null;
  }

  render() {
    switch (this.state.size) {
      case 1:
        this.content = <h1 onClick={() => this.props.elementFocusedTransistor(event)}
                  class='ws-component header'>{this.state.val}</h1>;
        break;
      case 2:
        this.content = <h2 onClick={() => this.props.elementFocusedTransistor(event)}
                  class='ws-component header'>{this.state.val}</h2>;
        break;
      case 3:
        this.content = <h3 onClick={() => this.props.elementFocusedTransistor(event)}
                  class='ws-component header'>{this.state.val}</h3>;
        break;
      case 4:
        this.content = <h4 onClick={() => this.props.elementFocusedTransistor(event)}
                  class='ws-component header'>{this.state.val}</h4>;
        break;
      case 5:
        this.content = <h5 onClick={() => this.props.elementFocusedTransistor(event)}
                  class='ws-component header'>{this.state.val}</h5>;
        break;
      case 6:
        this.content = <h6 onClick={() => this.props.elementFocusedTransistor(event)}
                  class='ws-component header'>{this.state.val}</h6>;
        break;
      }

    return(
      <div id={this.state.element_id} onMouseOver={() => this.props.displayDeleteButton()} onMouseOut={() => this.props.clearDeleteButton()}>
        <button type="button" class="btn btn-danger" onClick={() => this.props.deleteComponent()}>
          <i class="fas fa-times"></i>
        </button>
        {this.content}
      </div>
    );
  }
}
