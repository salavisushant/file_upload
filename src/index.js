const express = require('express');

const userController = require("./controller/user.controller")
const gallaryController = require("./controller/gallary.controller")

const app = express();

app.use(express.json());

app.use ("/user", userController);
app.use ("/gallary", gallaryController);

module.exports = app;