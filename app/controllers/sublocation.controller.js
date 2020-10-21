const db = require("../models");
const SubLocations = db.sublocations;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.SubLocationDescription) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a SubLocation
  const sublocation = {
    SubLocationDescription: req.body.SubLocationDescription,
    SubLocationActive: req.body.SubLocationActive ? req.body.SubLocationActive : false,
    locationId: req.body.locationId
  };

  // Save SubLocation in the database
  SubLocations.create(sublocation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sublocation."
      });
    });
};

// Retrieve all SubLocations from the database.
exports.findAll = (req, res) => {
    const id = req.query.id; // Do not change this
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    SubLocations.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  