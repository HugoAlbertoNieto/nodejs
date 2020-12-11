const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roles: req.body.roles
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          console.log(roles);
          console.log('---');
          console.log(user);
          console.log('---');          
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Update a user password by the id in the request
exports.update = (req, res) => {
  const id = req.body.iduser; // Do not change this

  User.findOne({
    where: {
      id: id
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.currpassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!"
      });
    }
    var data = {
      password:bcrypt.hashSync(req.body.newpassword, 8)
    }
    User.update(data, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  });
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id; // Do not change this
  var condition = id ? { id:id } : null;

  User.findAll({
      where: condition,
      include: [{// Notice `include` takes an ARRAY
        model: Role
      }]    
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Update a username or roles by the id in the request
exports.updateData = (req, res) => {
  const id = req.query.iduser; // Do not change this
  var data = {
    username:req.body.username,
    roles: req.body.roles
  }
  User.update  (data, {
    where: { id: id },
    returning: true
  })
  .then(() => {return User.findByPk(id)})
  .then(users => {
    console.log(users);
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        console.log(roles);
        console.log('---');
        console.log(users);
        console.log('---');
        users.setRoles(roles).then(() => {
          res.send({ message: "User was updated successfully!" });
        });
      });
    } else {
      // user role = 1
      users.setRoles([1]).then(() => {
        res.send({ message: "User was updated successfully!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });  
}