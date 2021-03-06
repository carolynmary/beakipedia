
const mongoose = require("mongoose");
const db = require("../models");
const { mongoOptions } = require("./config")
const userSeed = require("./userSeed.json")
const postSeed = require("./postSeed.json")
const clinicSeed = require("./clinicSeed.json")

// This file empties the Books collection and inserts the books below


mongoose.connect(process.env.ATLAS_URL || "mongodb://localhost/mern",
   mongoOptions
);

// remove all posts
db.Post.deleteMany({})
// remove all users
  .then(() => db.User.deleteMany({}))
  // add user
  .then(() => db.User.create(userSeed))
  // add comments seeds
  .then((user) => db.Post.create(postSeed[0])
      // add comment ref to user
      .then(({_id}) => db.User.findOneAndUpdate({_id: user._id}, { $push: { posts: _id } }, { new: true }))
  )
//   is the above necessary?? -SP
  .then((user) => db.Comment.create([postSeed][1])
      // add comment ref to user
      .then(({_id}) => db.User.findOneAndUpdate({_id: user._id}, { $push: { posts: _id } }, { new: true }))
  )
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

//remove all clinics and re seed
db.Clinic.deleteMany({})
  .then(() => db.Clinic.create(clinicSeed))
  .then(() => {
     process.exit(0);
  })
  .catch(err => {
     console.error(err);
     process.exit(1);
  });