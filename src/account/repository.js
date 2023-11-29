const { getDB } = require("../utils/DB/DB.connect");

const create = (data) => {
	let { accountId, email, accountName, appSecretToken, website } = data;
	return new Promise((resolve, reject) => {
		getDB().run(
			'INSERT INTO accounts (id, email, accountName, appSecretToken, website) VALUES (?, ?, ?, ?, ?)',
			[accountId, email, accountName, appSecretToken, website],
			(err) => {
				if (err) reject ({ statusCode: 403, error: err })
			}
		);
		resolve(true);
	})
}


const getAll = () => {
	return new Promise((resolve, reject) => {
		getDB().all('SELECT * FROM accounts', (err, accounts) => {
			if (err) {
				reject({ statusCode: 403, error: err });
			} else {
				resolve(accounts);
			}
		});
	});
};

const getAcountUsingAppSecretToken = (appSecretToken) => {
	return new Promise((resolve, reject) => {
		getDB().get('SELECT * FROM accounts WHERE appSecretToken = ?', [appSecretToken], (err, account) => {
			if (err) reject({ statusCode: 403, error: err });
			resolve(account);
		});
	})
}

const getAcountUsingId = (accountId) => {
	return new Promise((resolve, reject) => {
		getDB().get('SELECT * FROM accounts WHERE id = ?', [accountId], (err, account) => {
			if (err) reject({ statusCode: 403, error: err });
			resolve(account);
		});
	})
}

const updateAcountUsingId = (accountId, updateData) => {
	let { email, accountName, website } = updateData;
	return new Promise((resolve, reject) => {
		getDB().run(
			'UPDATE accounts SET email = ?, accountName = ?, website = ? WHERE id = ?',
			[email, accountName, website, accountId],
			(err) => {
				if (err) reject({ statusCode: 403, error: err });
			}
		);
		resolve(true);
	})
}


const deleteAcountUsingId = (accountId) => {
	return new Promise((resolve, reject) => {
		getDB().run('DELETE FROM accounts WHERE id = ?', [accountId], (err) => {
			if (err) reject({ statusCode: 403, error: err });
		})
		resolve(true);
	})
}

module.exports = {
	create,
	getAll,
	getAcountUsingAppSecretToken,
	getAcountUsingId,
	updateAcountUsingId,
	deleteAcountUsingId
}