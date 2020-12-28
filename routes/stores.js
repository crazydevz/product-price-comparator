const express = require('express');
const mongoose = require('mongoose');
const store = require('../models/store');
const router = express.Router();

const storeModel = require('../models/store');

// get all stores data
router.get('/get',(req, res) => {
  storeModel.find().exec(function(err, storeData) {
    if(err)console.log("Error Retrieving STORES Data: "+err);
    else {res.json(storeData);}
  })
});

// search product in all stores
router.get('/:productName', (req, res) => {
  var productParam = req.params.productName;
  var stores = [];
  var matchedProducts = [];
  storeModel.find().exec(function(err, storeData) {
    if(err) {
      console.log("Error Retrieving STORES Data during PRODUCT Search: "+err);
      res.json(500);
      return;
    } else {
      stores = storeData;

      // Find products with matching name
      stores.forEach(store => {
        store.products.forEach(product => {
          if (product.name.toLowerCase().includes(productParam.toLowerCase())) {
            matchedProducts.push({
              name: product.name,
              store: store.name,
              price: product.price,
            });
          }
        })
      });

      // Set discount of matched products
      var maxPrice = matchedProducts[0].price;

      // determine max price
      matchedProducts.forEach(product => {
        if (product.price > maxPrice) {
          maxPrice = product.price;
        }
      });

      // take difference of all products' prices from max price
      matchedProducts.forEach(product => {
        product.discount = maxPrice - product.price;
      })
    }
    res.json(matchedProducts);
  })
});

module.exports=router;