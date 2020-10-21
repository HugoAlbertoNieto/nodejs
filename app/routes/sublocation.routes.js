module.exports = app => {
    const sublocations = require("../controllers/sublocation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Sublocation
    router.post("/", sublocations.create);
  
    // Retrieve all Sublocation
    router.get("/", sublocations.findAll);
  
    // Retrieve all published SubLocation
    // router.get("/published", sublocations.findAllPublished);
  
    // Retrieve a single Sublocation with id
    // router.get("/:id", sublocations.findOne);
  
    // Update a Sublocation with id
    // router.put("/:id", sublocations.update);
  
    // Delete a Sublocation with id
    // router.delete("/:id", sublocations.delete);
  
    // Delete all Sublocations
    // router.delete("/", sublocations.deleteAll);
  
    app.use('/api/sublocations', router);
  };
  