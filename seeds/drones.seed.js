// Iteration #1
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";
const Drone = require("../models/Drone.model");


const drones = [
  { name: "Rayo Mcqueen", propellers: 3, maxSpeed: 12 },
  { name: "Papagallo v120 ", propellers: 4, maxSpeed: 20 },
  { name: "Bera 3000", propellers: 6, maxSpeed: 18 },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

Drone.create(drones)
  .then((results) => {
    console.log("Drones added", results);
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
