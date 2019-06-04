const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const http = require('http');

const fixtures = require('./fixtures');
const index = path.join(__dirname, '/views/ejs/index.ejs');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'test/html'});

  const file = fs.readFileSync(index, 'utf8');
  const copmiledFunction = ejs.compile(file, ...
  );

  res.write(copmiledFunction({f: fixtures}));

})