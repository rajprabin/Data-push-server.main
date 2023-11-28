const destinationRepository = require("./repository");
const accountRepository = require("../account/repository");
const { v4: uuidv4 } = require("uuid");

const createDestination = async (req) => {
	const { accountId, url, httpMethod, headers } = req.body;

	const destinationId = uuidv4();

	const account = await accountRepository.getAcountUsingId(accountId);

	if (!account) throw ({ status: false, error: "Account is not exist", statusCode: 403 });

	const destinationData = {
		accountId,
		destinationId,
		url,
		httpMethod,
		headers
	}

	await destinationRepository.create(destinationData);

	return { status: true, data: destinationData }

}

const getAccountDestination = async (req) => {
	const { accountId } = req.params;

	const account = await accountRepository.getAcountUsingId(accountId);

	if (!account) throw ({ status: false, error: "Account is not exist", statusCode: 403 });

	const destinations = await destinationRepository.getDestinationsUsingAccountId(accountId);

	return { status: true, data: destinations }

}

const updateDestination = async (req) => {
	const { destinationId } = req.params;

	const { url, httpMethod, headers } = req.body;

	const destination = await destinationRepository.getDestinationsUsingId(destinationId);

	if (!destination) throw ({ status: false, error: "Destination is not exist", statusCode: 403 });

	const updateData = {
		url,
		httpMethod,
		headers
	}

	await destinationRepository.updateDestinationsUsingId(destinationId, updateData);

	return { status: true, data: "Updated sucessfully" }

}

const deleteDestination = async (req) => {
	const { destinationId } = req.params;

	const destination = await destinationRepository.getDestinationsUsingId(destinationId);

	if (!destination) throw ({ status: false, error: "Destination is not exist", statusCode: 403 });

	await destinationRepository.deleteDestinationUsingId(accountId);

	return { status: true, data: "Successfully deleted" }

}

module.exports = {
	createDestination,
	getAccountDestination,
	updateDestination,
	deleteDestination
}