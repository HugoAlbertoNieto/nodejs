const db = require("../models");
const Locations = db.locations;
const Sublocations = db.sublocations;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.LocationId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Location
  const location = {
    LocationId: req.body.LocationId,
    LocationDescription: req.body.LocationDescription,
    LocationActive: req.body.LocationActive ? req.body.LocationActive : false
  };

  // Save Location in the database
  Locations.create(location)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Location."
      });
    });
};

// Retrieve all Locations from the database.
exports.findAll = (req, res) => {
  const id = req.query.id; // Do not change this
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Locations.findAll({ where: condition })
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

// Find a single Location with an id
exports.findOne = (req, res) => {
  const id = req.params.id; // Do not change this

  Locations.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Location with id=" + id
      });
    });
};

// Update a Location by the id in the request
exports.update = (req, res) => {
  const id = req.params.id; // Do not change this

  Locations.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Location was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Location with id=" + id
      });
    });
};

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Locations from the database.
exports.deleteAll = (req, res) => {

};

// Find all active Locations
exports.findAllPublished = (req, res) => {
  Locations.findAll({ where: { LocationActive: true } })
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

// Get the sublocations for a given location
exports.findTutorialById = (LocationId) => {
  return Locations.findByPk(LocationId, { include: ["sublocation"] })
    .then((locatioin) => {
      return location;
    })
    .catch((err) => {
      console.log(">> Error while finding Location: ", err);
    });
};