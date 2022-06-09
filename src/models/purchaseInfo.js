const mongoose = require("mongoose");

const purchaseInfo = new mongoose.Schema(
  {
    last_purchase: {
      type: Date,
      default: Date.now,
    },

        
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true, 
        ref:'Product'
      },
  },
)


const Product = mongoose.model('PurchaseInfo', purchaseInfo)

module.exports = Product
