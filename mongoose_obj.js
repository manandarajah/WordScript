const mongoose = require('mongoose');

let header_schema, image_schema, components_schema, admin_schema;
let Header, Image, Components, Admin;

module.exports = {
  initializeDBComponents: function() {
    header_schema = new mongoose.Schema({
      id: {
        type: String,
        required: [true, "Object Id is required"]
      },
      type: String,
      position: {
        top: Number,
        left: Number
      },
      element_id: {
        type: String,
        required: [true, "Component Id is required"]
      },
      size: {
        type: Number,
        min: 1,
        max: 6
      },
      val: String
    });

    image_schema = new mongoose.Schema({
      id: {
        type: String,
        required: [true, "Object Id is required"]
      },
      type: String,
      position: {
        top: Number,
        left: Number
      },
      element_id: {
        type: String,
        required: [true, "Component Id is required"]
      },
      size: {
        width: Number,
        height: Number
      },
      path: String
    });

    components_schema = new mongoose.Schema({
      headers: [{header_schema}],
      images: [{image_schema}]
    });

    admin_schema = new mongoose.Schema({
      name: String,
      role: String,
      components_id: String,
      components: components_schema
    });

    Header = mongoose.model("Header", header_schema);
    Image = mongoose.model("Image", image_schema);
    Components = mongoose.model("Components", components_schema);
    Admin = mongoose.model("Admin", admin_schema);
    console.log("Mongoose initialized");
  },
  initializeMongoose: function(dburl) {
    console.log(dburl);
    mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});
  },
  findOneAdmin: async function() {
    return Admin.findOne().exec();
  },
  findAllAdmin: async function() {
    return Admin.find().exec();
  },
  findAdminWithName: async function(name) {
    return Admin.findOne({"name": name}).exec();
  },
  updateOneAdmin: async function(id, components) {
    Admin.updateOne({"_id": id}, {"components": components}, function(err, data) {
      if (err) console.log(err);
      else {

      }
    });
  },
  insertOneAdmin: function(components) {
    const admin = new Admin({
      name: "master",
      role: "admin",
      components_id: components._id,
      components: components
    });

    admin.save();
    return admin;
  },
  findAllComponents: async function() {
    return Components.find().exec();
  },
  findOneComponents: async function(id) {
    return Components.findOne({"_id": id}).exec();
  },
  updateOneComponents: async function(id, headers, images) {
    Components.updateOne({"_id": id}, {"headers": headers, "images": images}, function(err, data) {
      if (err) console.log(err);
      else {

      }
    });
  },
  insertOneComponents: function(headers, images) {
    var components = new Components({
      headers: headers,
      images: images
    });

    components.save();
    return components;
  },
  findOneHeaderWithComponentId: async function(id) {
    return Header.findOne({"_id": id}).exec();
  },
  findOneHeaderWithId: async function(id) {
    return Header.findOne({"id": id}).exec();
  },
  findAllHeaders: async function() {
    return Header.find().exec();
  },
  updateOneHeader: async function(header) {
    Header.updateOne({"id": header.id}, header, { upsert: true}, function(err, data) {
      if (err) console.log(err);
      else {

      }
    });
  },
  // insertOneHeader: function(new_header) {
  //   var header = new Header({
  //     id: new_header.id,
  //     type: new_header.type,
  //     position: new_header.position,
  //     element_id: new_header.element_id,
  //     size: new_header.size,
  //     val: new_header.val
  //   });

  //   header.save();
  // },
  deleteOneHeader: async function(id) {
    await Header.deleteOne({"id": id}).exec();
    console.log("Deleted header component");
  },
  findOneImageWithComponentId: async function(id) {
    return Image.findOne({"_id": id}).exec();
  },
  findOneImageWithId: async function(id) {
    return Image.findOne({"id": id}).exec();
  },
  findAllImages: async function() {
    return Image.find().exec();
  },
  updateOneImage: async function(image) {
    Image.updateOne({"id": image.id}, image, { upsert: true}, function(err, data) {
      if (err) console.log(err);
      else {

      }
    });
  },
  // insertOneImage: function(new_image) {
  //   var image = new Image({
  //     id: new_image.id,
  //     type: new_image.type,
  //     position: new_image.position,
  //     element_id: new_image.element_id,
  //     size: new_image.size,
  //     val: new_image.val
  //   });

  //   image.save();
  // },
  deleteOneImage: async function(id) {
    await Image.deleteOne({"id": id}).exec();
    console.log("Deleted image component");
  }
};
