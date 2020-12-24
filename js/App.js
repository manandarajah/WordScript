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
    this.firstRender = new Map();
    this.firstRender.set("Header", true);
    this.firstRender.set("Image", true);

    //A map of components list
    this.componentsData = new Map();
    this.componentsData.set("Header", this.state.headers);
    this.componentsData.set("Image", this.state.images);

    //A map of anonymous functions updating components list onDataTransfer
    this.componentsAltered = new Map();
    this.componentsAltered.set("Header", (headers) => { this.setState({ headers: headers }); });
    this.componentsAltered.set("Image", (images) => { this.setState({ images: images }); });

    this.handleDataTransfer = this.handleDataTransfer.bind(this);
  }

  addComponent(newObj, type) {
    let compData = this.componentsData.get(type);
    compData.push(newObj);
    this.componentsAltered.get(type)(compData);
  }

  handleDataTransfer(index, data) {
    let compData = this.componentsData.get(data.type);

    if (this.firstRender.get(data.type)) {
      compData.pop();

      this.firstRender.set(data.type, false);
    }
    compData[index] = data;

    this.componentsAltered.get(data.type)(compData);
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
                      onDataTransfer={this.handleDataTransfer} />
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
                    onDataTransfer={this.handleDataTransfer} />
          );
        })}
        </section>
      </div>
    );
  }
}
