const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0.0,
      validate(value) {
        if (value < 0) {
          throw new Error("Price must be a positive integer");
        }
      },
    },
    rating: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Rating must be a positive integer");
        }
        if (value > 5) {
          throw new Error("Rating must be between 1 and 5");
        }
      },
    },

  },
  {
     toJSON: { virtuals: true },
  }

)

productSchema.virtual('purchase_info', {
  ref: 'PurchaseInfo',
  localField: '_id',
  foreignField: 'product_id'
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
