const express = require('express');
const nconf = require('nconf');
const loader = require('./loader');

const app = express();

process.on('unhandledRejection', (reason, p) => {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

process.on('uncaughtException', function (exception) {
    console.error(exception);
});


loader(app);

app.listen(nconf.get("port"), () => {
  console.log(`Server is running on http://localhost:${nconf.get("port")}`);
});
