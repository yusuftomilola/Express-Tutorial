const { logger, authorize } = require("./middleware");
const express = require("express");
const app = express();

// req => middleware => res
app.use(logger);

//multiple middlewares - it executes according to how they are arranged left to right
// app.use([logger, authorize]);

//or specify the route and any route after that url, the middleware gets applied to them
// app.use('/api',logger) - /api/products/new/shoes
app.use("/contact", authorize);

app.get("/", (req, res) => {
  res.send("homePage");
});

app.get("/about", (req, res) => {
  res.send("aboutPage");
});

app.get("/contact", (req, res) => {
  res.send("contactPage");
});

app.listen(5000, () => {
  console.log("server is listening at port 5000");
});
