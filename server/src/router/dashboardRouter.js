const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController");
const dashboardRouter = express.Router();

dashboardRouter.get("/", getDashboardData);

module.exports = dashboardRouter;
