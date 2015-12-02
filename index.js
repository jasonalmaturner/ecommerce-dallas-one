var express = require('express'),
  app = express(),
  port = 9001,
  cors = require('cors'),
  bodyParser = require('body-parser'),
  controller = require('./server-assets/controller');

app.use(cors(), bodyParser.json(), express.static(__dirname + '/public'));

app.get('/api/products', controller.getProducts);
app.post('/api/products', controller.postProduct);
app.put('/api/products/:id', controller.updateProduct);
app.delete('/api/products/:id', controller.removeProduct);

app.listen(port, function() {
  console.log('listening on port: ', port);
});
