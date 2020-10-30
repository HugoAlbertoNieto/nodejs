module.exports = (sequelize, Sequelize) => {
    const Movement = sequelize.define("movement", {
      MovementType: {
        type: Sequelize.INTEGER
      },
      MovementNumber : {
        type: Sequelize.STRING
      },
      RaisedBy: {
        type: Sequelize.STRING
      },   
      TotalMovement: {
        type: Sequelize.DECIMAL
      },         
      // PO FIELDS
      DueDate: {
        type: Sequelize.DATE
      }, 
      DeliveryAddress: {
        type: Sequelize.STRING
      },             
      Supplier: {
        type: Sequelize.STRING
      }, 
      SupplierReference: {
        type: Sequelize.STRING
      },         
      TermsAccount: {
        type: Sequelize.STRING
      },      
      // BOOK IN AND BOOK OUT FIELDS   
      JobNumber: {
        type: Sequelize.STRING
      },     
      // WASTAGE FIELDS 
      Reason: {
        type: Sequelize.STRING
      },       
      
      SpecialNotes: { // Comments in any other different from PO
        type: Sequelize.STRING
      }         
    });
    return Movement;
  };
  
  // Movement types:
  // 1 - Initial stock
  // 2 - Purchase Order
  // 3 - Book In
  // 4 - Book Out
  // 5 - Wastage