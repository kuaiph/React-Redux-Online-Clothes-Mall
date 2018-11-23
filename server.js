const path = require('path');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 8123;

app.get('/api/products', (req, res) => {
  // In Node.js, __dirname is always the directory in which the currently executing script resides (see this). So if you typed __dirname into /d1/d2/myscript.js, the value would be /d1/d2.
    res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${ port }.`);
});
