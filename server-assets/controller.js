var mongojs = require('mongojs'),
  db = mongojs('ecommerce', ['products']);

module.exports = {
  getProducts: function(req, res) {
    db.products.find(req.query, function(err, results) {
      if (err) return res.status(500).json(err);
      return res.json(results);
    });
  },

  postProduct: function(req, res) {
    db.products.insert(req.body, function(err, results) {
      if (err) return res.status(500).json(err);
      return res.send('product added');
    });
  },

  updateProduct: function(req, res) {
    if (req.body._id) {
      delete req.body._id;
    };

    var id = mongojs.ObjectId(req.params.id);
    db.products.findAndModify({
      query: {
        _id: id,
      },
      update: {
        $set: req.body,
      },
    }, function(err, result) {
      if (err) return res.status(500).json(err);
      return res.send('product updated');
    });
  },

  removeProduct: function(req, res) {
    db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
      if (err) return res.status(500).json(err);
      return res.send('product deleted');
    });
  },
};
