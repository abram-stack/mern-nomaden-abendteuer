//without custom error middleware, we get the response of html response error

//example of error middleware

const notFound = (req, res, next) => {
  throw new Error(`Not found ${req.originalUrl}`);
  res.status(404)
  next();
}

const errorHandler = (err, req, res, next) => { 
  //sometimes the error also res status 200
  const statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  console.log(statusCode);
  res.status(statusCode);
  res.json({
    message: err.message
  })
  console.log('error handling middleware');
  next();
}

export { notFound, errorHandler} 