const express = require('express');
const morgan = require('morgan');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const models = require('./models');
const layout = require('./views/layout');

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

const init = async () => {
  await models.User.sync()
  await models.Page.sync()

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });

}

app.get('/wiki', (req, res) => {
  // res.send(layout(''));

});

init()

