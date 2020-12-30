const { minumimstocks } = require("../models");
const db = require("../models");
const MinimumStocks = db.minumimstocks;

// Retrieve all minimumstocks from the database.
exports.findAll = (req, res) => {
  const locationid = req.query.locationid; // Do not change this
  var condition = locationid ? { locationId: locationid} : null;

  MinimumStocks.findAll({ where: condition, 
    include:[
        { model:db.items, as:'item',  
        required:false
        },
        { model:db.locations, as:'location',  
        required:false
        }        
      ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving minimumstocks."
      });
    });
};

// Retrieve minimumstock from the database with location and sublocation.
exports.findAllWithLocAndSub = (req, res) => {
    const locationid = req.query.locationid; 
    const sublocationid = req.query.sublocationid; 
    var condition = { locationId: locationid, sublocationId: sublocationid };
  
    MinimumStocks.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving minimumstocks."
        });
      });
  };

  exports.create = (req, res) => {
    // Validate request
    if (!req.body.ItemPartNumber) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a minimumstock
    const minstock = {
      ItemPartNumber: req.body.ItemPartNumber,
      quantity: req.body.quantity,
      locationId: req.body.locationId,
      itemId: req.body.itemId
    };
  
    // Save minimumstock in the database
    MinimumStocks.create(minstock)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the minimumstock."
        });
      });
  };
  
// Retrieve minimumstocks with itemid and locationid
exports.findIfExists = (req, res) => {
  const locationid = req.query.locationid; // Do not change this
  const itemid = req.query.itemid; // Do not change this
  var condition = { locationId: locationid, itemId: itemid} ;

  MinimumStocks.findAll({ where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving minimumstocks."
      });
    });
};

// Update a minimumstock by the id in the request
exports.update = (req, res) => {
  const id = req.params.id; // Do not change this

  MinimumStocks.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Minimumstock was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update minimumstock with id=${id}. Maybe minimum stock was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating minimumstock with id=" + id
      });
    });
};

// Find a single minimimstock with an id
exports.findOne = (req, res) => {
  const id = req.params.id; // Do not change this

  MinimumStocks.findOne({where: { id: id },
    include:[
      { model:db.items, as:'item',  
      required:false
      },
      { model:db.locations, as:'location',  
      required:false
      }        
    ]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving minimumstock with id=" + id
      });
    });
};

exports.MinVsAvilableStock = (req, res) => {
  var FilterValue
  const filterStockStatus = req.query.filterStockStatus
  console.log(filterStockStatus);
  if (filterStockStatus == 2) {
    FilterValue = ''
  }
  else if (filterStockStatus == 1) {
    FilterValue = " WHERE IFNULL(movitems.TotalStock, 0) - minstock.quantity <= 0"
  }
  else if (filterStockStatus == 0) {
    FilterValue = " WHERE IFNULL(movitems.TotalStock, 0) - minstock.quantity > 0"
  }
  else {
    FilterValue = ''
  }
  const sql =  "SELECT minstock.itemId, " +
  " minstock.locationId, " +
  " its.ItemPartNumber, " +
  " its.ItemDescription, " +
  " locs.LocationId, " +
  " IFNULL(movitems.TotalStock, 0) AS StockAvailable, " +
  " minstock.quantity AS MinimumStock, " +
  " IFNULL(movitems.TotalStock, 0) - minstock.quantity AS Difference " +
  " FROM minimumstocks minstock " +
 " LEFT JOIN items its ON minstock.itemId = its.id " +
 " LEFT JOIN locations locs ON minstock.locationId = locs.id " +
 " LEFT JOIN " +
 " (SELECT Location, ItemId, ItemDescription, UnitOfMeasure, UnitPrice, iditem, SUM(Quantity) AS TotalStock " +
 " FROM movementitems " +
 " WHERE MovementImplemented = 1 " +
 " GROUP BY iditem, Location) movitems " +
 " ON (locs.LocationId = movitems.Location AND minstock.itemId = movitems.iditem) " +
 FilterValue
  db.sequelize.query(sql
  , { type:db.Sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  })
};
