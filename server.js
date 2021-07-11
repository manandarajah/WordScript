require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose_obj = require("./mongoose_obj");
const passport = require('passport');
const base64 = require('base-64');
const queryString = require('query-string');

const app = express();

app.enable('trust proxy');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({  extended: true }));

app.use(passport.initialize());
app.use(passport.session());

mongoose_obj.initializeMongoose(process.env.DB_URL);
mongoose_obj.initializeDBComponents();

app.get('/', async function(req, res) {
  //res.sendFile(__dirname + '/index.html');

  //Find admin record
  var admin;
  var headers = [], images = [];
  var is_edit_permission_granted = true;
  var url = req.url;
  var user;

  //Checks to see if a client is using another client's linkview. If it's true, grant permission to view other client's
  //content without editing privileges. If not, go to the main client's page with editing privileges
  if (url.includes('user')) {
    is_edit_permission_granted = false;
    url = url.replace('/','');
    var params = queryString.parse(url);
    var name = base64.decode(params.user);
    admin = await mongoose_obj.findAdminWithName(name);
  }

  else
    admin = await mongoose_obj.findOneAdmin();

  if (admin != null) {
    //Referemce list of components in admin, both header and images
    user = base64.encode(admin.name);
    var components = await mongoose_obj.findOneComponents(admin.components_id);
    var header_id_array_list = components.headers;
    var image_id_array_list = components.images;

    //Store them in an array, and pass them into the index.ejs, and store them to use with App.js
    for (var i = 0; i < header_id_array_list.length; ++i)
      headers.push(await mongoose_obj.findOneHeaderWithComponentId(header_id_array_list[i]._id));

    for (var i = 0; i < image_id_array_list.length; ++i)
      images.push(await mongoose_obj.findOneImageWithComponentId(image_id_array_list[i]._id));
  }

  res.render("index",
    {
      user: user,
      dir: req.protocol + '://' + req.get('host') + url,
      headers: headers,
      images: images,
      is_edit_permission_granted: is_edit_permission_granted
    });
});

app.post('/', async function(req, res) {
  var components_from_client_side = req.body.components;
  var headers = [], images = [];
  console.log(components_from_client_side);

  if (components_from_client_side != null) {
    if (components_from_client_side.headers != null) {
      headers = components_from_client_side.headers;

      await Promise.all(Object.keys(headers).map(async h => {
        var component = headers[h];
        var header = await mongoose_obj.findOneHeaderWithId(component.id);
        if(header)
          mongoose_obj.updateOneHeader(component);
        else
          mongoose_obj.insertOneHeader(component);
      }));
    }

    if (components_from_client_side.images != null) {
      images = components_from_client_side.images;

      await Promise.all(Object.keys(images).map(async h => {
        var component = images[h];
        var image = await mongoose_obj.findOneImageWithId(component.id);

        if(image)
          mongoose_obj.updateOneImage(component);
        else
          mongoose_obj.insertOneImage(component);

      }));
    }
  }

  var components = await mongoose_obj.findAllComponents();
  headers = await mongoose_obj.findAllHeaders();
  images = await mongoose_obj.findAllImages();

  if (components.length > 0)
    mongoose_obj.updateOneComponents(components[0]._id, headers, images);
  else {
    components = await mongoose_obj.insertOneComponents(headers, images);
    mongoose_obj.insertOneAdmin(components);
  }

  var admin = await mongoose_obj.findAllAdmin();

  if (admin.length > 0)
    mongoose_obj.updateOneAdmin(admin[0]._id, components);

  res.end('yes');
});

app.post('/delete', async function(req, res) {
  var id = req.body.id;

  if (id.includes("Header"))
    mongoose_obj.deleteOneHeader(id);
  else if (id.includes("Image"))
    mongoose_obj.deleteOneImage(id);

  // switch (type) {
  //   case "Header":
  //     await Header.deleteOne({"id": id});
  //     break;
  //   case "Image":
  //     await Image.deleteOne({"id": id});
  //     break;
  // }
  res.end('yes');
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is runnning on port 3000");
});
