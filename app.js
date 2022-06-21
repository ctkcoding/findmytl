const express = require('express');
const chalk = require("chalk")
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const histRouter = require('./src/routers/history');
const homeRouter = require('./src/routers/home');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/history', histRouter);
app.get('/', homeRouter);

app.listen(PORT,()=>{
    debug(`listening on ${chalk.green('PORT')}`);
})