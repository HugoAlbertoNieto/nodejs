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
        type: Sequelize.DECIMAL(10,2)
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
      POStatus: {
        type: Sequelize.INTEGER
      },    
      // BOOK IN AND BOOK OUT FIELDS   
      JobNumber: {
        type: Sequelize.STRING
      },     
      // WASTAGE FIELDS 
      Reason: {
        type: Sequelize.STRING
      },       
      // RECEPTION FIELDS 
      POId: {
        type: Sequelize.INTEGER
      },  
      ReceptionPaymentStatus: {
        type: Sequelize.INTEGER
      }, 
      SpecialNotes: { // Comments in any other different from PO
        type: Sequelize.STRING
      }         
    });
    return Movement;
  };
  
  // Movement types:
  // 5 - Initial stock
  // 1 - Purchase Order
  // 2 - Book In
  // 3 - Book Out
  // 4 - Wastage

  /*
  PO Statuses:
  1 - Raised
  2 - Partially received
  3 - Received
  4 - Paid
  5 - Cancelled

  Reception Statuses:
  1 - Raised
  2 - Paid
  3 - Cancelled


  */