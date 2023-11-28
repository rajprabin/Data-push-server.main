const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./utils/errors/error-handler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const accountController = require("./account/controller");
const destinationController = require("./destination/controller");
const dataHandlerController = require("./data-handler/controller");

const routes = (app) => {

	app.use(morgan("tiny"));

	app.use(express.json());

	app.use("/health_check", (req, res) => {
		return res.status(200).send();
	});

	app.use("/api_docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
		swaggerOptions: {
			"syntaxHighlight": false
		}
	}));

	app.use("/accounts", accountController);

	app.use("/destinations", destinationController);

	app.use("/server/incoming_data", dataHandlerController);

	app.use("/**", (req, res) => {
		return res.status(404).send({ error: "There is no route to process your request." });
	})

	app.use(errorHandler)
}

module.exports = routes;