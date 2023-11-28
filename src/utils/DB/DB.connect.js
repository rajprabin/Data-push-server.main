const sqlite3 = require("sqlite3").verbose();
const createTable = require("./create-table");
const nconf = require("nconf");

let DB = null

const initializeDB = () => {
	DB = new sqlite3.Database(nconf.get("DBFile"));
	createTable(DB);
}

const getDB = () => DB

module.exports = {
	getDB,
	initializeDB
}