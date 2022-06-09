const Product = require("../models/product");
const PurchaseInfo = require("../models/purchaseInfo");
const mongoose = require("mongoose");
const faker = require("faker");
//connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connection open");
  })
  .catch((err) => {
    console.log(err);
  });


//seeder function
const seedDb = async () => {
  await Product.remove({}, function () {
    console.log("Products Database Cleared");
  });

  await PurchaseInfo.remove({}, function () {
    console.log("PurchaseInfo Database Cleared");
  });
  console.log("Database seeding.....");
  for(var i = 0; i < 10; i++) {
        //create a new product
        const newProduct = new Product({
            name: faker.commerce.product(),
            description:	faker.lorem.paragraph(),
            price: 	faker.commerce.price(),
            rating: faker.datatype.number({min:1, max:5}),
        });
        await newProduct.save();

        //create a new purchase info and associate it with the product
        const newPurchaseInfo = new PurchaseInfo({
            product_id: newProduct.id,
            last_purchase:faker.date.between('2022-01-01T00:00:00.000Z', '2022-06-09T15:54:52.800Z')
        });

        await newPurchaseInfo.save();
        };
}

//call and close db connection
seedDb().then(() => {
  mongoose.connection.close();
  console.log("Database successfully seeded");
  console.log("MongoDB connection closed");
});

