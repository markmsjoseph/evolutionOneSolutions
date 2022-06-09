const express = require("express");
const days_since_last_purchase = require('../utils/calculate_days')
const Product = require("../models/product");
const PurchaseInfo = require("../models/purchaseInfo");
const router = new express.Router();
const mongoose = require('mongoose');



router.post("/products/create", async (req, res) => {
  //save product to the database and return appropriate REST response status
  try {
    //create a new product
    const newProduct = new Product(req.body);
    await newProduct.save();

    //create a new purchase info and associate it with the product
    const newPurchaseInfo = new PurchaseInfo({
      product_id: newProduct.id,
    });
    await newPurchaseInfo.save();

    res.status(201).send(newProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/products", async (req, res) => {
  try {
    //find all products and their related purchaseinfo returning pagination options
    //limit shows a max number of results per page
    //skip is used for pagination
    Product.find()
      .populate({ path: "purchase_info", model: "PurchaseInfo" })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .then((product) => {

        if(product.length == 0){
          res.status(201).send({message: 'There are no available products'});
        }
        product.forEach((singleProduct) => {
          singleProduct.purchase_info[0].set(
            "days_since_last_purchase",
            days_since_last_purchase(singleProduct),
            { strict: false }
          );
        });
        res.send(product);
      });
  } catch (e) {
    res.status(500).send({error: 'Internal server error'})
  }
});

router.get("/products/:id", async (req, res) => {
  const _id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(_id)){
    res.status(400).send({message: 'Invalid Product ID'});
  }

  // find all products
  try {
   const specificProduct = await Product.findById(_id)
      .populate({ path: "purchase_info", model: "PurchaseInfo" })
      .then((product) => {

        if(!product){
          res.status(404).send({message: 'No products found with that id'});
        }else{
          product.purchase_info[0].set(
            "days_since_last_purchase",
            days_since_last_purchase(product),
            { strict: false }
          );
          res.status(201).send(product);
        }
    
      });
  } 
  catch (e) {
    res.status(500).send({error: "Internal Server Error"});
  }
});

//test
//docker

module.exports = router;
