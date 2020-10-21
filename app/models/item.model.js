module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
      ItemPartNumber: {
        type: Sequelize.STRING
      },
      ItemDescription: {
        type: Sequelize.STRING
      },
      UnitOfMeasure : {
        type: Sequelize.STRING
      },
      UnitPrice: {
        type: Sequelize.DECIMAL
      },      
      Supplier: {
        type: Sequelize.STRING
      },       
      PackPrice: {
        type: Sequelize.DECIMAL
      }     
    });
    return Item;
  };
  
  