const { getDB } = require("../utils/DB/DB.connect");

const create = (data) => {
	let { destinationId, accountId, url, httpMethod, headers } = data
	return new Promise((resolve, reject) => {
		getDB().run(
			'INSERT INTO destinations (id, accountId, url, httpMethod, headers) VALUES (?, ?, ?, ?, ?)',
			[destinationId, accountId, url, httpMethod, JSON.stringify(headers)],
			(err) => {
				if (err) reject({ statusCode: 403, error: err });
			}
		);
		resolve(true)
	});
}

const getDestinationsUsingAccountId = (accountId) => {
	return new Promise((resolve, reject) => {
		getDB().all('SELECT * FROM destinations WHERE accountId = ?', [accountId], async (err, destinations) => {
			if (err) reject({ statusCode: 403, error: err });
			const modifiedDestinations = destinations.map(dest => ({ ...dest, headers: JSON.parse(dest.headers) }))
			resolve(modifiedDestinations);
		});
	});
}

const getDestinationsUsingId = (destinationId) => {
	return new Promise((resolve, reject) => {
		getDB().all('SELECT * FROM destinations WHERE id = ?', [destinationId], async (err, destination) => {
			if (err) reject({ statusCode: 403, error: err });
			destination.headers = JSON.parse(dest.headers)
			resolve(destination);
		});
	});
}

const deleteDestinationsUsingAccountId = (accountId) => {
	return new Promise((resolve, reject) => {
		getDB().run('DELETE FROM destinations WHERE accountId = ?', [accountId], (err) => {
			if (err) reject({ statusCode: 403, error: err });
		});
		resolve(true);
	});
}


const updateDestinationsUsingId = (destinationId, updateData) => {
	let { url, httpMethod, headers } = updateData;
	return new Promise((resolve, reject) => {
		getDB().run(
			'UPDATE destinations SET url = ?, httpMethod = ?, headers = ? WHERE id = ?',
			[url, httpMethod, JSON.stringify(headers), destinationId],
			(err) => {
				if (err) reject({ statusCode: 403, error: err });
			}
		);
		resolve(true);
	});
}

const deleteDestinationUsingId = (destinationId) => {
	return new Promise((resolve, reject) => {
		getDB().run('DELETE FROM destinations WHERE id = ?', [destinationId], (err) => {
			if (err) {
				if (err) reject({ statusCode: 403, error: err });
			}
		});
		resolve(true);

	});
}


module.exports = {
	create,
	getDestinationsUsingAccountId,
	deleteDestinationsUsingAccountId,
	updateDestinationsUsingId,
	deleteDestinationUsingId,
	getDestinationsUsingId
}