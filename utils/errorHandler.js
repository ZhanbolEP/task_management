module.exports = (res, error) => {
  console.error(error); // This will print the full error stack in your logs
  res.status(500).json({
    success: false,
    message: error.message ? error.message : error
  });
};
