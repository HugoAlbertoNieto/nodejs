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
        type: Sequelize.DECIMAL(10,2)
      },      
      Supplier: {
        type: Sequelize.STRING
      },       
      PackPrice: {
        type: Sequelize.DECIMAL(10,2)
      }, 
      ProductQty: {
        type: Sequelize.DECIMAL
      },         
      ImagePath: {
        type: Sequelize.STRING
      }           
    });
    return Item;
  };
  
  