const db = require("../models");
const Items = db.items;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.ItemPartNumber) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Item
  const item = {
    ItemPartNumber: req.body.ItemPartNumber,
    ItemDescription: req.body.ItemDescription,
    UnitOfMeasure: req.body.UnitOfMeasure,
    UnitPrice: req.body.UnitPrice,
    Supplier: req.body.Supplier,
    PackPrice: req.body.PackPrice,
    ProductQty: req.body.ProductQty,
    ImagePath: req.body.ImagePath,
  };

  // Save Item in the database
  Items.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};

// Retrieve all Items from the database.
exports.findAll = (req, res) => {
  const id = req.query.id; // Do not change this
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Items.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};

// Retrieve all Items from the database with a condition.
// Pass condition as parameters in Postman
exports.findAllCondition = (req, res) => {

    const id = req.query.desc; 
    var condition = id ? { ItemDescription: { [Op.like]: `%${id}%` } } : null;
  
    Items.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving items."
        });
      });
  };

// Find item with itemPartNumber
exports.findWithPN = (req, res) => {
  const id = req.query.itemid; // Do not change this
  var condition = id ? { ItemPartNumber: { [Op.like]: `%${id}%` } } : null;

  Items.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id; // Do not change this

  Items.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};

// Update a Item by the id in the request
exports.update = (req, res) => {
  const id = req.params.id; // Do not change this

  Items.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Location with id=" + id
      });
    });
};

// Delete an Item with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {

};

// Find all Items of supplier
exports.findAllFromSupplier = (req, res) => {
  Items.findAll({ where: { Supplier: "EMTELE" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations."
      });
    });
};

// Get stock of all items
// Retrieve stock of all Items from the database.
exports.findStockAll = (req, res) => {
  Items.findAll({ 
    
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};