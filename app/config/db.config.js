module.exports = {
  HOST: "new-inventory-management.chasmnxxanut.eu-west-2.rds.amazonaws.com", // 127.0.0.1  // inventory-management.chasmnxxanut.eu-west-2.rds.amazonaws.com
  USER: "admin", // root // admin
  PASSWORD: "Amarganale1988=", //amarganale1988  //Amarganale1988=
  DB: "inventoryManagement",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
