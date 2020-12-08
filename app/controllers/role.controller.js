const db = require("../models");
const Roles = db.role;

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  const id = req.query.id; // Do not change this
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Roles.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving roles."
      });
    });
};
