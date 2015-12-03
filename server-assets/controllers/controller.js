var mongoose = require('mongoose'),
  Product = require('../models/product');

module.exports = {
  getProducts: function(req, res) {
    Product.find(req.query).exec().then(function(results) {
      return res.json(results);
    }, function(err) {
      return res.status(500).json(err);
    });
  },

  postProduct: function(req, res) {
    var product = new Product(req.body);
    product.save().exec().then(function(result) {
      return res.send('product added');
    }, function(err) {
      return res.status(500).json(err);
    });
  },

  updateProduct: function(req, res) {
    Product.update({_id: req.body._id}, req.body, {runValidators: true}).exec().then(function(result) {
      return res.send('product updated');
    }, function(err) {
      return res.status(500).json(err);
    });
  },

  removeProduct: function(req, res) {
    db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
      if (err) return res.status(500).json(err);
      return res.send('product deleted');
    });
  },
};
