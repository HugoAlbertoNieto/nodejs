module.exports = app => {
    const minimumstocks = require("../controllers/minimumstock.controller.js");
  
    var router = require("express").Router();
  
    // Create a new minimumstock
    //router.post("/", minimumstock.create);
  
    // Retrieve all minimumstocks
    router.get("/", minimumstocks.findAll);

    // Compare minimum stock with current stock
    router.get("/comparminavailablestock/", minimumstocks.MinVsAvilableStock);

    router.get("/getone/:id", minimumstocks.findOne);

    router.get("/findminstock", minimumstocks.findIfExists);

    // Update a minimumstock with id
    router.put("/:id", minimumstocks.update);

    router.post("/", minimumstocks.create);
  
    app.use('/api/minimumstocks', router);
  };
  
