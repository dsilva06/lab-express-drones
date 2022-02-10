const express = require("express");
const router = express.Router();

const Drone = require("../models/Drone.model");

router.get("/drones", (req, res, next) => {
  Drone.find()
    .then((allDrones) => {
      console.log(allDrones);
      res.render("drones/list", { drones: allDrones });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/drones/create-drones", (req, res, next) => {
  res.render("drones/create-form");
});

router.post("/drones/create-drones", (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create({
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  })
    .then(() => {
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findById(req.params.id)
    .then((foundDrone) => {
      console.log("We found this drone", foundDrone);
      res.render("drones/update-form", {
        name: foundDrone.name,
        propellers: foundDrone.propellers,
        maxSpeed: foundDrone.maxSpeed,
        _id: foundDrone._id,
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  Drone.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  })
    .then(() => {
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/drones/:id/remove", (req, res, next) => {
  // Iteration #5: Delete the drone
  Drone.findByIdAndRemove(req.params.id)
    .then((removedDrone) => {
      console.log("Drone", removedDrone);
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });
});

module.exports = router;
