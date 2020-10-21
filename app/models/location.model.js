module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    LocationId: {
      type: Sequelize.STRING
    },
    LocationDescription: {
      type: Sequelize.STRING
    },
    LocationActive: {
      type: Sequelize.BOOLEAN
    }
  });
  return Location;
};


