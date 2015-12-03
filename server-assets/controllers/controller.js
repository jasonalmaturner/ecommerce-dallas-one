var mongoose = require('mongoose'),
  Product = require('../models/product');

module.exports = {
  getProducts: function(req, res) {
    Product.find(req.query).exec().then(function(results) {
      return res.json(results);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  postProduct: function(req, res) {
    var product = new Product(req.body);
    product.save().exec().then(function(result) {
      return res.send('product added');
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  updateProduct: function(req, res) {
    Product.update({_id: req.body._id}, req.body, {runValidators: true}).exec().then(function(result) {
      return res.send('product updated');
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  removeProduct: function(req, res) {
    // In reality, I probably wouldn't remove a product from my database. I would
    // archive it, in case I wanted to bring that product back into my inventory
    Product.remove({_id: req.params.id}, function(err, results) {
      if (err) return res.status(500).json(err);
      return res.send('product deleted');
    });
  },
};
