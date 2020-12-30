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
    Movements.findAll({ where: { MovementType:movtype, Supplier: id },
      order: [
        ['MovementNumber', 'DESC'],
      ]
    })
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

// Find all Movements from a userid
exports.findAllFromUser = (req, res) => {
  if (!req.query.userid) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const id = req.query.userid; 
    Movements.findAll({ where: { userId: id } })
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

// Retrieve all Movements from the database with multiple conditions.
// Pass conditions as parameters in Postman
exports.findMultipleCondition = (req, res) => {
  const userid = req.body.userid; 
  const status = req.body.status; 
  const supplier = req.body.supplier; 
  const dateini = req.body.dateini;
  const dateend = req.body.dateend;

  const mthini = req.body.mthini; 
  const yrini = req.body.yrini; 
  const dyini = req.body.dyini; 
  const mthend = req.body.mthend; 
  const yrend = req.body.yrend; 
  const dyend = req.body.dyend; 
  var conditions = {MovementType: 1}
  /*var dateconditions = (mthini && yrini && dyini && mthend && yrend && dyend) ? { DueDate: {
    [Op.gte]: new Date(yrini+"-"+mthini+"-"+dyini),
    [Op.lt]: new Date(yrend+"-"+mthend+"-"+dyend+" 18:00:00")
  }}: null;*/
  var dateconditions = (dateini && dateend)? {DueDate: {
    [Op.gte]: new Date(dateini),
    [Op.lt]: new Date(dateend)
  }}: null;    

  //console.log(req.body);  
  if (userid) {
    var userconditions = (userid.length>0)?{userId: {[Op.in]: userid}}:null;
  }
  else {
    var userconditions = {userId: {[Op.notIn]: userid}};
  }
  if (status) {
    var statusconditions = (status.length>0)?{POStatus: {[Op.in]: status}}:null;
  }
  else {
    var statusconditions = {POStatus: {[Op.notIn]: status}};
  }
  if (supplier) {
    var supplierconditions = (supplier.length>0)?{Supplier: {[Op.in]: supplier}}:null;
  }
  else {
    var supplierconditions = {Supplier: {[Op.notIn]: supplier}};
  }
  var allconditions = Object.assign(conditions,userconditions);
  var allconditions = Object.assign(allconditions,statusconditions);
  var allconditions = Object.assign(allconditions,supplierconditions);
  var allconditions = Object.assign(allconditions,dateconditions);
  Movements.findAll({ where: allconditions })
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

// Retrieve all unique users that have created a PO.
// Pass conditions as parameters in Postman
exports.findUniqueUsersPO = (req, res) => {
  Movements.findAll({
    attributes: [
      [db.sequelize.fn('DISTINCT', db.sequelize.col('userId')) ,'id'],
      "RaisedBy",
    ] 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving unique users on POs."
      });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////   // the following are the routes for the POStats page  ////////////////////////////////////////

// Retrieve Movements grouped by month from the database with a condition.
// condition is supplier purchase and year
// Pass condition as parameters in Postman
exports.SpendMonthSupplier = (req, res) => {
  const yr = req.query.yr;   
  const supp = req.query.supplier;
  console.log(supp);
  var condition = { MovementType: 1, Supplier: supp, createdAt: {
    [Op.gte]: new Date(yr+"-"+"01"+"-"+"01"),
    [Op.lt]: new Date(yr+"-"+"12"+"-"+"31"+" 18:00:00")}} //six hour after this hour

  Movements.findAll({ where: condition,
    attributes: [[db.sequelize.fn('month', db.sequelize.col('createdAt')),'Month'],
    [db.sequelize.fn('sum', db.sequelize.col('TotalMovement')),'Total Spend']], 
    group: ["month"],
    order: [['createdAt', 'ASC']]})
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.GetPOStatus = (req, res) => {
  const supp = req.query.supplier
  console.log(supp);
  const sql =  "SELECT IF(POStatus=3,'Done',IF(DueDate<CURDATE(),'Delayed','Awaiting')) AS 'DeliveringStatus', COUNT(MovementNumber) AS 'Number of POs' FROM movements " +
  " WHERE (YEAR(DueDate) = YEAR(CURDATE())) AND (Supplier = '" + supp + "')" +
  " GROUP BY DeliveringStatus " +
  " ORDER BY POStatus"
  db.sequelize.query(sql
  , { type:db.Sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  })
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.GetQuarterSpend = (req, res) => {
  const sql =  "SELECT QUARTER(createdAt) AS QuarterNum, SUM(TotalMovement) AS QuarterSpend FROM movements " +
  " WHERE (YEAR(createdAt) = YEAR(CURDATE())) AND (MovementType = 1) " +
  " GROUP BY QuarterNum" 
  db.sequelize.query(sql
  , { type:db.Sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  })
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.GetDelayedBySupplier = (req, res) => {
  const sql =  "SELECT Supplier, COUNT(MovementNumber) AS NumberOfPOs FROM movements " +
  " WHERE (YEAR(createdAt) = YEAR(CURDATE())) AND (MovementType = 1) AND (IF(POStatus=3,'Done',IF(DueDate<CURDATE(),'Delayed','Awaiting')) = 'Delayed') " +
  " GROUP BY Supplier " +
  " ORDER BY NumberOfPOs DESC" 
  db.sequelize.query(sql
  , { type:db.Sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  })
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// for req.query:
// use params in Postman, 
//path without /:"param" in the backend and 
//path with /?"parameter"="valueparameter" in the front end