const express = require("express");
const { products, people } = require("./data");

const app = express();

app.use(express.static("./public"));

app.get("/about", (req, res) => {
  res.status(200).send(`
    <h1>AboutPage</h1>
    <a href='/api/products'>Get data: Products (Route Params)</a>
    <a href='/api/v1/search'>Search: (Query String Params)</a>
    `);
  console.log(`Has the header been sent? ${res.headersSent}`);
});

// ROUTE PARAMS EXAMPLE
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image, price } = product;
    return { id, name, image, price };
  });
  res.status(200).json(newProducts);
});

app.get("/api/products/:id", (req, res) => {
  const productID = Number(req.params.id);
  const singleProduct = products.find((product) => product.id === productID);

  //   res.status(200).json(singleProduct);

  if (singleProduct) {
    return res.status(200).json(singleProduct);
  } else if (!singleProduct) {
    return res.status(404).send(`
    <h1>Oops!</h1>
    <p>The product "${req.params.id}" you are looking for does not exist</P>
    `);
  }
});

// QUERY STRINGS PARAMS
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  //   let sortedProducts = Array.from(products);
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.includes(search)
    );
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    return res.status(200).send(`
    <h1>Oops!</h1>
    <p>Your search ${search} did not match any products</p>
    `);
  }

  res.status(200).json(sortedProducts);
  console.log(sortedProducts);
});

// Get all params
app.all("*", (req, res) => {
  res.status(404).send(`
    <h1>Oops!</h1>
    <p>Page not found</p>
    `);
});

// App listen
app.listen(5000, () => {
  console.log("server is listening at port 5000");
});
