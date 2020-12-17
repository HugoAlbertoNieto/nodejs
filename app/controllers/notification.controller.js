const db = require("../models");
const Notifications = db.notification;
const Users = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.update) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Notification
  const notification = {
    update: req.body.update,
    read: 0
  };

  // Save Notification in the database
  Notifications.create(notification)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notification."
      });
    });
};

// Retrieve all non read Notifications from the database ofr a specific user.
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
          err.message || "Some error occurred while retrieving notifications."
      });
    });
};
