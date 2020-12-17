module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
      update: { //better no to change the name
        type: Sequelize.STRING
      },
      read: {  //0 - not read, 1 - read
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
    return Notification;
  };
  
  
  