module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
      update: { //better no to change the name
        type: Sequelize.STRING
      },
      timestamp: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
    return Notification;
  };
  
  
  