const express = require('express');
const app = express();
const fallback = require("express-history-api-fallback");

const root = `${__dirname}/storybook-static`;
app.use(express.static(root));

// history fallback
app.use(fallback('index.html', { root }));
let port = process.argv[2] || 8080; // get port from command line argument
app.listen(port, () => console.log(`server is listening on port ${port}`));