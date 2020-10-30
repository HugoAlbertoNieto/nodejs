const db = require("../models");
const Movements = db.movements;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.MovementType) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a movement
  const movement = {
    MovementType: req.body.MovementType,
    MovementNumber: req.body.MovementNumber,
    RaisedBy: req.body.RaisedBy,
    TotalMovement: req.body.TotalMovement,
    DueDate: req.body.DueDate,
    DeliveryAddress: req.body.DeliveryAddress,
    Supplier: req.body.Supplier,
    SupplierReference: req.body.SupplierReference,
    TermsAccount: req.body.TermsAccount,
    JobNumber: req.body.JobNumber,
    Reason: req.body.Reason,
    SpecialNotes: req.body.SpecialNotes,
  };

  // Save Movement in the database
  Movements.create(movement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movement."
      });
    });
};

// Retrieve all Movements from the database.
exports.findAll = (req, res) => {
  const id = req.query.id; // Do not change this
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Movements.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movements."
      });
    });
};

// Retrieve all Movements from the database with a condition.
// Pass condition as parameters in Postman
exports.findAllCondition = (req, res) => {

    const id = req.query.type; 
    var condition = id ? { MovementType: { [Op.like]: `%${id}%` } } : null;
  
    Movements.findAll({ where: condition })
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

// Find a single Movement with an id
exports.findOne = (req, res) => {
  const id = req.params.id; // Do not change this

  Movements.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Movement with id=" + id
      });
    });
};

// Update a Movement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id; // Do not change this

  Movements.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Movement with id=${id}. Maybe Movement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movement with id=" + id
      });
    });
};

// Delete a Movement with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Movements from the database.
exports.deleteAll = (req, res) => {

};

// Find all Movements of supplier
exports.findAllFromSupplier = (req, res) => {
    Movements.findAll({ where: { Supplier: "EMTELE" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movements."
      });
    });
};

