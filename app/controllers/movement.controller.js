const db = require("../models");
const Movements = db.movements;
const Op = db.Sequelize.Op;

////////////////////////////////////////////////////// START DASHBOARD /////////////////////////////////

// Retrieve Movements grouped by supplier from the database with a condition.
// condition is supplier not null
// Pass condition as parameters in Postman
exports.findSpendBySupplier = (req, res) => {
  const mth = req.query.mth; 
  const yr = req.query.yr; 
  var condition = (mth && yr) ? { MovementType: 1, createdAt: {
    [Op.gte]: new Date(yr+"-"+mth+"-"+"01"),
    [Op.lt]: new Date(yr+"-"+mth+"-"+"31"+" 18:00:00") //six hour after this hour
  }}: null;

  Movements.findAll({ where: condition,
    attributes: ['Supplier', 
    [db.sequelize.fn('sum', db.sequelize.col('TotalMovement')),'Total Spend']], 
    group: ["Supplier"],
    order: [['TotalMovement', 'DESC']]})
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

// Retrieve Movements grouped by month from the database with a condition.
// condition is supplier purchase and year
// Pass condition as parameters in Postman
exports.findSpendByMonth = (req, res) => {
  const yr = req.query.yr; 
  var condition = { MovementType: 1, createdAt: {
    [Op.gte]: new Date(yr+"-"+"01"+"-"+"01"),
    [Op.lt]: new Date(yr+"-"+"12"+"-"+"31"+" 18:00:00")}} //six hour after this hour

  Movements.findAll({ where: condition,
    attributes: [[db.sequelize.fn('month', db.sequelize.col('createdAt')),'Month'],
    [db.sequelize.fn('sum', db.sequelize.col('TotalMovement')),'Total Spend']], 
    group: ["month"],
    order: [['createdAt', 'DESC']]})
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

// Retrieve Bookin amounts grouped by job number from the database with a condition.
// condition is supplier purchase and year
// Pass condition as parameters in Postman
exports.findBookinByJob = (req, res) => {
  const yr = req.query.yr; 
  var condition = { MovementType: 2, createdAt: {
    [Op.gte]: new Date(yr+"-"+"01"+"-"+"01"),
    [Op.lt]: new Date(yr+"-"+"12"+"-"+"31"+" 18:00:00")}} //six hour after this hour

  Movements.findAll({ where: condition,
    attributes: ['JobNumber',
    [db.sequelize.fn('sum', db.sequelize.col('TotalMovement')),'Total Amount']], 
    group: ["JobNumber"],
    order: [['TotalMovement', 'DESC']]})
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

// Retrieve Wastage grouped by month from the database with a condition.
// condition is supplier purchase and year
// Pass condition as parameters in Postman
exports.findWastageByMonth = (req, res) => {
  const yr = req.query.yr; 
  var condition = { MovementType: 4, createdAt: {
    [Op.gte]: new Date(yr+"-"+"01"+"-"+"01"),
    [Op.lt]: new Date(yr+"-"+"12"+"-"+"31"+" 18:00:00")}} //six hour after this hour

  Movements.findAll({ where: condition,
    attributes: [[db.sequelize.fn('month', db.sequelize.col('createdAt')),'Month'],
    [db.sequelize.fn('sum', db.sequelize.col('TotalMovement')),'Total Wastage']], 
    group: ["month"],
    order: [['createdAt', 'DESC']]})
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

////////////////////////////////////////////////////// END DASHBOARD /////////////////////////////////
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
    userId: req.body.userId,
    TotalMovement: req.body.TotalMovement,
    DueDate: req.body.DueDate,
    DeliveryAddress: req.body.DeliveryAddress,
    Supplier: req.body.Supplier,
    SupplierReference: req.body.SupplierReference,
    TermsAccount: req.body.TermsAccount,
    JobNumber: req.body.JobNumber,
    Reason: req.body.Reason,
    SpecialNotes: req.body.SpecialNotes,
    POId: req.body.POId,
    POStatus:req.body.POStatus,
    ReceptionPaymentStatus:req.body.ReceptionPaymentStatus,
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
  const supplier = req.body.supplier;
  var condition = supplier?{ MovementType: 1, Supplier: { [Op.like]: `%${supplier}%` } }:null ;

  Movements.findAll({ where: condition , order: [['MovementNumber', 'DESC']]})
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

exports.getMaxId = (req, res) => {

  Movements.findAll({
    attributes:[[db.sequelize.fn('max', db.sequelize.col('id')), 'maxId']],
    raw: true,
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


// Retrieve all Movements from the database with a condition.
// Pass condition as parameters in Postman
exports.findAllCondition = (req, res) => {

    const id = req.query.type; 
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
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
  if (!req.query.supplier) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const id = req.query.supplier; 
  const movtype = req.query.movementtype;
    Movements.findAll({ where: { MovementType:movtype, Supplier: id } })
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

// for req.query:
// use params in Postman, 
//path without /:"param" in the backend and 
//path with /?"parameter"="valueparameter" in the front end