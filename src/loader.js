const routes = require("./routes");
const { initializeDB } = require("./utils/DB/DB.connect");
const loadConfig = require("./utils/config/config");

const loader = (app) => {

	loadConfig();

	initializeDB();

	routes(app);

	console.log("All modules loaded sucessfully")
}

module.exports = loader;