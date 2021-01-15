module.exports = app => {
    const suppliers = require("../controllers/supplier.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Supplier
    router.post("/", suppliers.create);
  
    // Retrieve all Suppliers
    router.get("/", suppliers.findAll);
  
    // Retrieve all published Suppliers
    // router.get("/published", suppliers.findAllPublished);
  
    // Retrieve a single Supplier with id
    router.get("/:id", suppliers.findOne);
  
    // Update a Supplier with id
    router.put("/:id", suppliers.update);
  
    // Delete a Supplier with id
    // router.delete("/:id", suppliers.delete);
  
    // Delete all Suppliers
    // router.delete("/", suppliers.deleteAll);
  
    app.use('/api/suppliers', router);
  };
  