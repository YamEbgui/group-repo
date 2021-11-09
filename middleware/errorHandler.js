const express = require("express");

const errorHandler = (error, req, res, next) => {
  switch (error) {
    case 400:
      res.status(400);
      res.send("The name or number is missing");
      break;
    case 406:
      res.status(406);
      res.send("The name already exists");
      break;
    default:
      res.status(500);
      res.send("Server error, please try again later");
      break;
  }
};
module.exports = errorHandler;
