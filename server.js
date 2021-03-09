require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const base64 = require('base-64');
const queryString = require('query-string');

const app = express();

app.enable('trust proxy');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({  extended: true }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DBHOST + process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.set("useCreateIndex", true);

const headerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Object Id is required"]
  },
  type: String,
  position: {
    top: Number,
    left: Number
  },
  eId: {
    type: String,
    required: [true, "Component Id is required"]
  },
  size: {
    type: Number,
    min: 1,
    max: 4
  },
  val: String
});

const imageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Object Id is required"]
  },
  type: String,
  position: {
    top: Number,
    left: Number
  },
  eId: {
    type: String,
    required: [true, "Component Id is required"]
  },
  size: {
    width: Number,
    height: Number
  },
  path: String
});

const componentsSchema = new mongoose.Schema({
  headers: [{headerSchema}],
  images: [{imageSchema}]
});

const adminSchema = new mongoose.Schema({
  name: String,
  role: String,
  componentsId: String,
  components: componentsSchema
});

// function getHeader(object, callback) {
//   Header.find({"id": object.id}, function(err, headers) {
//     object.isNew = headers.length == 0 || headers[0].id != object.id ? true : false;
//     callback(err);
//   });
// }

// headerSchema.pre('save', function(next) {
//   // var that = this;
//   // getHeader(that, function(err) {
//   //   if (err) {
//   //     console.log(err);
//   //
//   //   }
//   //   next();
//   // });
//   this.constructor.findOne(function(err, header) {
//     if (err) {
//       console.log(err);
//     }
//
//     console.log("Inside " + this.isNew);
//     this.isNew = false;
//   });
//   this.isNew = false;
//
//   console.log("Outside " + this.isNew);
//   next();
// });

const Header = mongoose.model("Header", headerSchema);
const Image = mongoose.model("Image", imageSchema);
const Components = mongoose.model("Components", componentsSchema);
const Admin = mongoose.model("Admin", adminSchema);

app.get('/', async function(req, res) {
  //res.sendFile(__dirname + '/index.html');

  //Find admin record
  var admin;
  var headers = [], images = [];
  var canEdit = true;
  var url = req.url;
  var user;

  if (req.url.includes('user')) {
    canEdit = false;
    url = url.replace('/','');
    var params = queryString.parse(url);
    var name = base64.decode(params.user);
    admin = await Admin.findOne({"name": name }).exec();
  }

  else {
    admin = await Admin.findOne().exec();
  }

  if (admin != null) {
    //Referemce list of components in admin, both header and imageSchema
    user = base64.encode(admin.name);
    var components = await Components.findOne({"_id": admin.componentsId }).exec();
    var headerIds = components.headers;
    var imageIds = components.images;

    //Store them in an array, and pass them into the index.ejs, and store them to use with App.js
    for (var i = 0; i < headerIds.length; ++i) {
      headers.push(await Header.findOne({"_id": headerIds[i]._id}).exec());
    }

    for (var i = 0; i < imageIds.length; ++i) {
      images.push(await Image.findOne({"_id": imageIds[i]._id}).exec());
    }
  }

  res.render("index",
    {
      user: user,
      dir: req.protocol + '://' + req.get('host') + url,
      headers: headers,
      images: images,
      canEdit: canEdit
    });
});

app.post('/', async function(req, res) {
  var componentsData = req.body.components;
  var headers = [], images = [];

  if (componentsData != null) {
    if (componentsData.headers != null) {
      await Promise.all(Object.keys(componentsData.headers).map(async h => {
        var component = componentsData.headers[h];
        var header = await Header.findOne({"id": component.id}).exec();
        if(header){
          //This code has a problem handling update of multiple records
          /*for(key in component){
            header[key] = component[key];
          }*/
          Header.updateOne({"id": header.id}, component, function(err, docs) {
            if (err) {
              console.log(err);
            }

            else {
              //console.log("Updated header docs ", docs);
            }
          });
        } else {
          header = new Header({
            id: component.id,
            type: component.type,
            position: component.position,
            eId: component.eId,
            size: component.size,
            val: component.val
          });

          header.save();
          //headers.push(header);
        }
      }));
    }

    if (componentsData.images != null) {
      await Promise.all(Object.keys(componentsData.images).map(async h => {
        var component = componentsData.images[h];
        var image = await Image.findOne({"id": component.id}).exec();
        if(image){
          Image.updateOne({"id": image.id}, component, function(err, docs) {
            if (err) {
              console.log(err);
            }

            else {
              //console.log("Updated header docs ", docs);
            }
          });
        } else {
          image = new Image({
            id: component.id,
            type: component.type,
            position: component.position,
            eId: component.eId,
            size: component.size,
            val: component.val
          });

          image.save();
          //images.push(image);
        }
      }));
    }
  }

  var components = await Components.find().exec();
  //console.log(components);
  headers = await Header.find().exec();
  //console.log(headers);
  images = await Image.find().exec();

  if (components.length > 0) {
    Components.updateOne({"_id": components[0]._id}, {"headers": headers, "images": images}, function(err, docs) {
      if (err) {
        console.log(err);
      }

      else {
        //console.log("Updated components docs ", docs);
      }
    });
  }

  else {
    components = new Components({
      headers: headers,
      images: images
    });
    components.save();

    const admin = new Admin({
      name: "master",
      role: "admin",
      componentsId: components._id,
      components: components
    });
    admin.save();
  }

  var admin = await Admin.find().exec();

  if (admin.length > 0) {
    Admin.updateOne({"_id": admin[0]._id}, {"components": components}, function(err, docs) {
      if (err) {
        console.log(err);
      }

      else {
        //console.log("Updated admin docs ", docs);
      }
    });
  }
  res.end('yes');
});

app.post('/delete', async function(req, res) {
  var id = req.body.id;
  // var type = id.replace(id[id.length - 1], '\0');

  if (id.includes("Header")) {
    await Header.deleteOne({"id": id}).exec();
    console.log("Deleted header component");
  }

  else if (id.includes("Image")) {
    await Image.deleteOne({"id": id}).exec();
    console.log("Deleted image component");
  }

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
