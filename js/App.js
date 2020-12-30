class App extends React.Component {
//function App() {

  //const [headers, setHeaders] = React.useStates([]);

  constructor(props) {
    super(props);

    this.state = {
      headers: [],
      images: []
    };

    //A map of components list
    this.componentsData = new Map();
    this.componentsData.set("Header", this.state.headers);
    this.componentsData.set("Image", this.state.images);

    //A map of anonymous functions used for editing existing components
    this.componentsEdit = new Map();
    this.componentsEdit.set("Header", (h) => {
      return this.state.headers.map((header) => {
        if (header.id === h.id) {
          return {
            ...header,
            position: h.position,
            eId: h.eId,
            size: h.size,
            val: h.val
          };
        }

        return header;
      });
    });
    this.componentsEdit.set("Image", (img) => {
      return this.state.images.map((image) => {
        if (image.id === img.id) {
          return {
            ...image,
            position: img.position,
            eId: img.eId,
            size: img.size,
            path: img.path
          };
        }

        return image;
      });
    });

    //A map of anonymous functions updating components list onDataTransfer
    this.componentsAltered = new Map();
    this.componentsAltered.set("Header", (headers) => { this.setState({ headers: headers }); });
    this.componentsAltered.set("Image", (images) => { this.setState({ images: images }); });

    this.firstRender = new Map();
    this.firstRender.set("Header", true);
    this.firstRender.set("Image", true);

    this.handleDataTransfer = this.handleDataTransfer.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidUpdate() {
    this.componentsData.set("Header", this.state.headers);
    this.componentsData.set("Image", this.state.images);
  }

  addComponent(newObj, type) {
    let compData = this.componentsData.get(type);
    newObj.id = type + compData.length;
    compData.push(newObj);
    this.componentsAltered.get(type)(compData);
  }

  handleDataTransfer(data, type) {
    let compData = this.componentsData.get(type);
    compData = this.componentsEdit.get(type)(data);
    this.componentsAltered.get(type)(compData);
  }

  deleteData(id, type) {
    let compData = this.componentsData.get(type);
    compData = compData.filter(data => data.id !== id );
    this.componentsAltered.get(type)(compData);
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
              <Header key={header.id}
                      id={header.id}
                      eId={header.eId}
                      position={header.position}
                      size={header.size}
                      val={header.val}
                      onDataTransfer={this.handleDataTransfer}
                      onDelete={this.deleteData}/>
            );
          })}
        </section>
        <section id="images">
        {
          Object.keys(images).map((i, index) => {
          var image = images[i];
          //var header = headers[index]

          return (
            <Image key={image.id}
                   id={image.id}
                   position={image.position}
                   eId={image.eId}
                   path={image.path}
                   size={image.size}
                   onDataTransfer={this.handleDataTransfer}
                   onDelete={this.deleteData}/>
          );
        })}
        </section>
      </div>
    );
  }
}
