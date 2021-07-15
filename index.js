//Dependencies
const koa = require("koa");
const koaBody = require('koa-body');
const { middleware } = require("./book");

//Routes 
const bookRouter = require('./book');

//Create the koa instance
const app = new koa();

//middlewares
app.use(koaBody());

//Routes middleware
app.use(bookRouter.routes())


//Listen to the server on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
