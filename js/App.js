class App extends React.Component {
//function App() {

  //const [headers, setHeaders] = React.useStates([]);

  constructor(props) {
    super(props);

    this.state = {
      headers: [,],
      images: [,]
    };

    /*You need this parameter because react class component automatically has
    strict-mode enabled, causing elements to render twice during the first run
    as a side effect*/
    this.firstHeaderRender = true;
    this.firstImageRender = true;

    this.handleHeaderTrasfer = this.handleHeaderTrasfer.bind(this);
    this.handleImageTrasfer = this.handleImageTrasfer.bind(this);
  }

  addHeader(newHeaderObj) {
    let headers = this.state.headers;
    headers.push(newHeaderObj);

    this.setState({
      headers: headers
    });
    /*return ReactDOM.render(<Header isElementFocused={newHeaderObj[0].isElementFocused}
                                    size={newHeaderObj[0].size} />,
                                    document.getElementsByClassName("container-fluid")[0]);*/
  }

  addImage(newImageObj) {
    let images = this.state.images;
    images.push(newImageObj);

    this.setState({
      images: images
    });
  }

  handleHeaderTrasfer(index, data) {
    //if (this.state.positon != null) {
      let headers = this.state.headers;

      if (this.firstHeaderRender) {
        headers.pop();

        this.firstHeaderRender = false;
      }
      headers[index] = data;

      /*if (headers.length == 0) this.setState({headers: data});
      else {
        Object.keys(headers).map((h, index) => {
          var header = headers[h];

          if (header.id == data.id
                && (header.val !== data.val
                      || header.position != data.position)
              )
            headers[index] = data;
        });*/

        this.setState({
          headers: headers
        });
        console.log(headers);
      //}
    //}
  }

  handleImageTrasfer(index, data) {
    let images = this.state.images;

    if (this.firstImageRender) {
      images.pop();

      this.firstImageRender = false;
    }
    images[index] = data;

    this.setState({
      images: images
    });
    console.log(images);
  }

  render() {
    let headers = this.state.headers;
    let images = this.state.images;

    return(
      <div id="components">
        <section id="headers">
          {
            Object.keys(headers).map((h, index) => {
            var header = headers[h];
            //var header = headers[index]

            return (
              <Header key={index}
                      index={index}
                      position={header.position}
                      id={header.id}
                      size={header.size}
                      val={header.val}
                      onDataTransfer={this.handleHeaderTrasfer} />
            );
          })}
        </section>
        <section id="images">
        {
          Object.keys(images).map((i, index) => {
          var image = images[i];
          //var header = headers[index]

          return (
            <Image key={index}
                    index={index}
                    position={image.position}
                    id={image.id}
                    path={image.path}
                    onDataTransfer={this.handleImageTrasfer} />
          );
        })}
        </section>
      </div>
    );
  }
}
