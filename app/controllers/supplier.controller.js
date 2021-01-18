const db = require("../models");
const Suppliers = db.suppliers;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.SupplierName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Supplier
  const supplier = {
    SupplierName: req.body.SupplierName,
    SupplierMainContact: req.body.SupplierMainContact,
    SupplierMainContactPhone: req.body.SupplierMainContactPhone
  };

  // Save Supplier in the database
  Suppliers.create(supplier)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Supplier."
      });
    });
};

// Retrieve all Suppliers from the database.
exports.findAll = (req, res) => {
  const id = req.query.id; // Do not change this
  var condition = id ? { id: id } : null;

  Suppliers.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Suppliers."
      });
    });
};

// Find a single Supplier with an id
exports.findOne = (req, res) => {
  const id = req.params.id; // Do not change this

  Suppliers.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Supplier with id=" + id
      });
    });
};

// Update a Supplier by the id in the request
exports.update = (req, res) => {
  const id = req.params.id; // Do not change this

  Suppliers.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Supplier was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Supplier with id=${id}. Maybe Supplier was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Supplier with id=" + id
      });
    });
};

// Delete a Supplier with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Suppliers from the database.
exports.deleteAll = (req, res) => {

};
