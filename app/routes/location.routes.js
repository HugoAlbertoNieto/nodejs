module.exports = app => {
  const locations = require("../controllers/location.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", locations.create);

  // Retrieve all Tutorials
  router.get("/", locations.findAll);

  // Retrieve all published Tutorials
  router.get("/published", locations.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", locations.findOne);

  // Update a Tutorial with id
  router.put("/:id", locations.update);

  // Delete a Tutorial with id
  router.delete("/:id", locations.delete);

  // Delete all Tutorials
  router.delete("/", locations.deleteAll);

  app.use('/api/locations', router);
};
