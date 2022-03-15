const express = require("express");

const app = express();

console.log("desde index.js");

app.listen(4000,() => {
    console.log("Server running on port 4000");
})