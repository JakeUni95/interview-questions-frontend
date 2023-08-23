const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();

const setupRoutes = require('./routes');

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT ?? 3000;

nunjucks.configure([
  'node_modules/govuk-frontend/',
  'views'
], {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');

setupRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`view here: http://localhost:${port}`);
});
