module.exports = app => {
    const notifications = require("../controllers/notification.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Notification
    router.post("/", notifications.create);

    app.use('/api/notifications', router);    
};
  