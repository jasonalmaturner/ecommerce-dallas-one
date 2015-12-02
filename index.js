var express = require('express'),
  app = express(),
  port = 9001,
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongojs = require('mongojs'),
  db = mongojs('ecommerce', ['products']);

app.use(cors(), bodyParser.json(), express.static(__dirname + '/public'));

app.get('/api/products', function(req, res) {
  db.products.find(req.query, function(err, results) {
    if (err) return res.status(500).json(err);
    return res.json(results);
  });
});

app.post('/api/products', function(req, res) {
  db.products.insert(req.body, function(err, results) {
    if (err) return res.status(500).json(err);
    return res.send('product added');
  });
});

app.put('/api/products/:id', function(req, res) {
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
});

app.delete('/api/products/:id', function(req, res) {
  db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
    if (err) return res.status(500).json(err);
    return res.send('product deleted');
  });
});


app.listen(port, function() {
  console.log('listening on port: ', port);
  // db.on('connect', function() {
  //   console.log('db connected');
  // });
  // db.on('error', function(err) {
  //   console.log(err);
  // });
});
