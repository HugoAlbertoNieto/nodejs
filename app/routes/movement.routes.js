module.exports = app => {
    const movements = require("../controllers/movement.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Movement
    router.post("/", movements.create);
  
    // Retrieve all Movement
    router.get("/", movements.findAll);

    // Retrieve all Movement with condition
    router.get("/search/", movements.findAllCondition);    
  
    // Retrieve all POs from Movement
    router.get("/fromsupplier", movements.findAllFromSupplier);
  
    // Retrieve a single Movement with id
    router.get("/:id", movements.findOne);
  
    // Update a Movement with id
    router.put("/:id", movements.update);
  
    // Delete a Movement with id
    router.delete("/:id", movements.delete);
  
    // Delete all Movement
    router.delete("/", movements.deleteAll);

    // Get max id movement
    router.get("/vals/maxid", movements.getMaxId);
      
    app.use('/api/movements', router);
  };
  