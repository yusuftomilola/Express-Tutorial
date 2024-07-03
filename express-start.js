const express = require("express");
const { readFileSync } = require("fs");
const path = require("path");
const app = express();

// used to setup static files & middleware
app.use(express.static("./public"));

// DIFFERENT WAYS OF DISPLAYING INDEX.HTML
// app.get("/", (req, res) => {
//   [1.] res.status(200).send(readFileSync("./navbar-app/index.html", "utf8"));
//   [2.] res.status(200).sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// [3.] Adding the index.html file to the public folder
// [4.] SSR
// });

app.get("/about", (req, res) => {
  res.status(200).send(`
    <h1>About Page</h1>
    <p>Description about what we do</p>
    `);
});

app.all("*", (req, res) => {
  res.status(404).send(`
  <h1>Oops!</h1>
<p>404, Page not found</p>`);
});

app.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});

//app.get
//app.put
//app.post
//app.delete
//app.all
//app.use
//app.listen
