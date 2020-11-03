const db = require("../models");
const MovementItems = db.movementitems;
const Op = db.Sequelize.Op;

// Retrieve GROUPED MovementItems from the database with a condition.
// condition is itemid
// Pass condition as parameters in Postman
exports.findAllConditionGroupBy = (req, res) => {
  const id = req.query.itemid; 
  var condition = id ? { ItemId: { [Op.like]: `%${id}%` }, MovementImplemented:1 }: null;

  MovementItems.findAll({ where: condition,
    attributes: ['Location', 'SubLocation', 
    [db.sequelize.fn('sum', db.sequelize.col('Quantity')),'total']], 
    group: ["Location","SubLocation"] })
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


exports.create = (req, res) => {
  // Validate request
  if ((!req.body.ItemId) && (!req.body.Quantity)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a movementitem
  const movement = {
    ItemId: req.body.ItemId,
    ItemDescription: req.body.ItemDescription,
    UnitOfMeasure: req.body.UnitOfMeasure,
    UnitPrice: req.body.UnitPrice,
    Quantity: req.body.Quantity,
    Location: req.body.Location,
    SubLocation: req.body.SubLocation,
    MovementImplemented: req.body.MovementImplemented,
    movementId: req.body.movementId,
  };

  // Save MovementItem in the database
  MovementItems.create(movement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movement Item."
      });
    });
};

// Retrieve all MovementItems from the database.
// condition is itemid
exports.findAll = (req, res) => {
  // pass itemid as parameter
  const id = req.query.itemid; // Do not change this
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  MovementItems.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movementitems."
      });
    });
};

// Retrieve all MovementItems from the database with a condition.
// condition is movementid
// Pass condition as parameters in Postman
exports.findAllCondition = (req, res) => {
    const id = req.query.movementid; 
    var condition = id ? { movementId: { [Op.like]: `%${id}%` } } : null;
  
    MovementItems.findAll({ where: condition })
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

// Find a single MovementItem with an id
exports.findOne = (req, res) => {
  const id = req.params.id; // Do not change this

  MovementItems.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Movement with id=" + id
      });
    });
};

// Update a MovementItem by the id in the request
exports.update = (req, res) => {
  const id = req.params.id; // Do not change this

  MovementItems.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "MovementItem was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update MovementItem with id=${id}. Maybe MovementItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating MovementItem with id=" + id
      });
    });
};

// Delete a MovementItem with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all MovementItems from the database.
exports.deleteAll = (req, res) => {

};
