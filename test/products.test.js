const app = require("../src/app");
const Product = require("../src/models/product");
const PurchaseInfo = require("../src/models/purchaseInfo");
const request = require("supertest");

beforeEach(async () => {
  await Product.deleteMany();
  await PurchaseInfo.deleteMany();
});

test("Should create a product", async () => {
  const response = await request(app)
    .post("/products/create")
    .send({
      name: "Carrot",
      description: "Carrot punch",
      price: 4000,
      rating: 4,
    })
    .expect(201);
  // Assert that the database was changed correctly
  const product = await Product.findById(response.body._id);
  expect(product).not.toBeNull();
  // Assertions about the response
  expect(response.body).toMatchObject({
    __v: 0,
    _id: response.body._id,
    name: "Carrot",
    description: "Carrot punch",
    rating: 4,
    price: 4000,
    purchase_info: null,
    id: response.body._id,
  });
});

test("Should fetch all products", async () => {
  const response = await request(app).get("/products").send().expect(201);
});
