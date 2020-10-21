module.exports = (sequelize, Sequelize) => {
    const SubLocation = sequelize.define("sublocation", {
      SubLocationDescription: {
        type: Sequelize.STRING
      },
      SubLocationActive: {
        type: Sequelize.BOOLEAN
      }
    })    
    return SubLocation;
  };
  