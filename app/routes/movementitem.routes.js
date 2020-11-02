module.exports = app => {
    const movementitems = require("../controllers/movementitem.controller.js");
  
    var router = require("express").Router();
  
    // Create a new MovementItem
    router.post("/", movementitems.create);
  
    // Retrieve all MovementItems
    router.get("/", movementitems.findAll);

    // Retrieve all MovementItems with condition
    router.get("/search/", movementitems.findAllCondition);    
  
    // Retrieve a single MovementItem with id
    router.get("/:id", movementitems.findOne);
  
    // Update a MovementItem with id
    router.put("/:id", movementitems.update);
  
    // Delete a MovementItem with id
    router.delete("/:id", movementitems.delete);
  
    // Delete all MovementItems
    router.delete("/", movementitems.deleteAll);
  
    app.use('/api/movementitems', router);
  };
  