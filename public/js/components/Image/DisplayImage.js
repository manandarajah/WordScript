class DisplayImage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      element_id: props.element_id,
      path: props.path
    };
  }

  componentWillUnmount() {
    this.state = null;
  }

  render() {
    return(
      <div id={this.state.element_id} onMouseOver={() => this.props.displayDeleteButton()} onMouseOut={() => this.props.clearDeleteButton()}>
        <button type="button" class="btn btn-danger" onClick={() => this.props.deleteComponent()}>
          <i class="fas fa-times"></i>
        </button>
        <img class="ws-component" onClick={() => this.props.elementFocusedTransistor(event)} src={this.state.path} />
      </div>
    );
  }
}
