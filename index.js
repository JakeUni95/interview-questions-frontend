const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = 3000;

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.get('/', (req, res) => {
  res.render('index.njk', {
    someNumber: 42,
    someItems: [   
      {   
        title: 'First item',  
      },  
      {  
        title: 'Second item', 
      },  
    ],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
