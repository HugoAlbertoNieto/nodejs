module.exports = (sequelize, Sequelize) => {
    const MinimumStock = sequelize.define("minimumstocks", {
      ItemPartNumber: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.DOUBLE
      }
    });
  
    return MinimumStock;
  };