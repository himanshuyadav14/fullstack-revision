const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    res.responseTime = duration;

    console.log("Request Method: ", req.method);
    console.log("Request URL: ", req.url);
    console.log("Status Code: ", res.statusCode);
    console.log("Response Time: ", res.responseTime);
    console.log("--------------------------------");
  });

  next();
};
