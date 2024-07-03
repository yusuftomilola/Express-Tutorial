// req => middleware => res
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().getDay();
  console.log(method, url, date);
  next();
};

const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user) {
    next();
  } else {
    res.status(401).send(`
    <h1>Oops 401 Unauthorized</h1>
    <p>Sorry you are not allowed to access this page</p>
    `);
  }
};

module.exports = {
  logger,
  authorize,
};
