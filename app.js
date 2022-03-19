'use strict'

const express = require("express");
const app = express();
const port = 3001;

app.use(express.static('Content'));

app.listen(port, () => {
    console.log(`Intro to WebDev listening on port ${port}: http://localhost:${port} || http://localhost:${port}/advanced`);
});