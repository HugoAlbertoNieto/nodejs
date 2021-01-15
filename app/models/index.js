const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.locations = require("./location.model.js")(sequelize, Sequelize);
db.sublocations = require("./sublocation.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js")(sequelize, Sequelize);
db.movements = require("./movement.model.js")(sequelize, Sequelize);
db.movementitems = require("./movementitem.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.notification = require("../models/notification.model.js")(sequelize, Sequelize);
db.minumimstocks = require("../models/minimumstock.model.js")(sequelize, Sequelize);
db.suppliers = require("../models/supplier.model.js")(sequelize, Sequelize);

db.locations.hasMany(db.minumimstocks, { as: "minStock" });
db.minumimstocks.belongsTo(db.locations, {as: "location"});

db.items.hasMany(db.minumimstocks, { as: "minStock" });
db.minumimstocks.belongsTo(db.items);

db.locations.hasMany(db.sublocations, { as: "sublocation" });
db.sublocations.belongsTo(db.locations, {as: "location"});

db.movements.hasMany(db.movementitems, { as: "item" });
db.movementitems.belongsTo(db.movements, {as: "movement"});

db.suppliers.hasMany(db.movements, { as: "movement" });
db.movements.belongsTo(db.suppliers, {as: "supplier"});

db.user.hasMany(db.movements, { as: "movement" });
db.movements.belongsTo(db.user, {as: "user"});

db.items.hasMany(db.movementitems, { foreignKey: 'iditem' });
db.movementitems.belongsTo(db.items, { foreignKey: 'iditem' });

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.notification.belongsToMany(db.user, {
  through: "user_notifications",
  foreignKey: "notificationId",
  otherKey: "userId"
});
db.user.belongsToMany(db.notification, {
  through: "user_notifications",
  foreignKey: "userId",
  otherKey: "notificationId"
});

// Remember to add user roles here
db.ROLES = ["USER-B", "USER-A", "ADMIN", "MODERATOR", "WAREHOUSE", "FINANCES", "PURCHASE"];

module.exports = db;
