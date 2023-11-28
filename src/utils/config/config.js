const nconf = require("nconf");

const config = {
	port: 3000,
	DBFile: "./src/utils/DB/database.sqlite"
}

const loadConfig = () => {
	nconf.argv().env().add("data", { type: "literal", store: config });
}

module.exports = loadConfig;