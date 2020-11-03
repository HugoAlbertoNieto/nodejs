module.exports = (sequelize, Sequelize) => {
    const MovementItem = sequelize.define("movementitem", {
      ItemId: {
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
      Quantity: {
        type: Sequelize.DECIMAL
      },      
      Location: {
        type: Sequelize.STRING
      },          
      SubLocation: {
        type: Sequelize.STRING
      },       
      MovementImplemented: {
        type: Sequelize.INTEGER  // 0 or 1
      },     
    });
    return MovementItem;
  };
  
  