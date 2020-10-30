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

db.locations.hasMany(db.sublocations, { as: "sublocation" });
db.sublocations.belongsTo(db.locations, {as: "location"});

db.movements.hasMany(db.movementitems, { as: "item" });
db.movementitems.belongsTo(db.movements, {as: "movement"});
module.exports = db;
