const createTable = (DB)=>{
	DB.serialize(() => {
		DB.run(`CREATE TABLE IF NOT EXISTS accounts (
		  id TEXT PRIMARY KEY,
		  email TEXT UNIQUE,
		  accountName TEXT NOT NULL,
		  appSecretToken TEXT,
		  website TEXT
		)`);
	  
		DB.run(`CREATE TABLE IF NOT EXISTS destinations (
		  id TEXT PRIMARY KEY,
		  accountId TEXT,
		  url TEXT NOT NULL,
		  httpMethod TEXT NOT NULL,
		  headers TEXT NOT NULL,
		  FOREIGN KEY (accountId) REFERENCES accounts(id) ON DELETE CASCADE
		)`);
	  });
}

module.exports = createTable;