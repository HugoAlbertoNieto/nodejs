module.exports = {
  HOST: "inventory-management.chasmnxxanut.eu-west-2.rds.amazonaws.com", // 127.0.0.1
  USER: "admin", // root
  PASSWORD: "Amarganale1988=", //amarganale1988
  DB: "inventoryManagement",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
