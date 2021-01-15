module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define("supplier", {
      SupplierName: {
        type: Sequelize.STRING
      },
      SupplierMainContact: {
        type: Sequelize.STRING
      },
      SupplierMainContactPhone: {
        type: Sequelize.STRING
      }
    });
    return Supplier;
  };
  
  
  