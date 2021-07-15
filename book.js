//Dependencies
const Router = require("koa-router");

//Create an instance of the koa-router
const router = new Router({
  prefix: "/books",
});

//Create a list of books
let books = [
  { id: 101, name: "Fight Club", author: "Chuck Palahniuk" },
  { id: 102, name: "Sharp Objects", author: "Gillian Flynn" },
  { id: 103, name: "Frankenstein", author: "Mary Shelley" },
  { id: 104, name: "Into The Wild", author: "John Krakauer" },
];

//All routes goes here

//Get all books router
router.get("/", (ctx, next) => {
  //Get all th books
  ctx.body = books;
  next();
});

//Counts all books
router.get("/books/-counts", (ctx, next) => {
  if (books.length > 0) {
    ctx.body = {
      status: 200,
      message: `There are ${books.length} books in the database`,
    };
  } else {
    ctx.body = {
      status: 404,
      message: `There are ${books.length} books in the database`,
    };
  }
  next();
});

//Get a single book from the database
router.get("/:id", (ctx, next) => {
  let getCurrentBook = books.filter(function (book) {
    if (book.id == ctx.params.id) {
      return true;
    }
  });
  if (getCurrentBook.length) {
    ctx.body = getCurrentBook[0];
  } else {
    ctx.response.status = 404;
    ctx.body = {
      error: "Book Not Found",
    };
  }
  next();
});

//Add a new book
router.post("/new", (ctx, next) => {
  if (
    !ctx.request.body.id ||
    !ctx.request.body.name ||
    !ctx.request.body.author
  ) {
    //Send a error msg
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Please enter a valid data",
    };
  } else {
    //Create the new book
    let newBook = books.push({
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      author: ctx.request.body.author,
    });
    //Send a response
    ctx.response.status = 201;
    ctx.response.body = {
      message: "Book added succesfully",
      data: {
        id: ctx.request.body.id,
        name: ctx.request.body.name,
        author: ctx.request.body.author,
      },
    };
  }
  next();
});

module.exports = router;
