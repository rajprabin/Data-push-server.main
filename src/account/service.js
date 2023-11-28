const { v4: uuidv4 } = require('uuid');
const getToken = require("../utils/generate-random-token/random-token");
const accountRepository = require("./repository");
const destinationRepository = require("../destination/repository");


const createAccount =async (req) => {
	const { email, accountName, website } = req.body;
	const accountId = uuidv4();
	const appSecretToken = getToken(30);

	const accountData = {
		accountId,
		email,
		accountName,
		appSecretToken,
		website
	}

	await accountRepository.create(accountData);

	return { data: accountData }
}

const getAccounts = async () => {
	const accounts = await accountRepository.getAll();
	return { data: accounts };
}

const updateAccount = async (req, res) => {
	const { accountId } = req.params;

	const account = await accountRepository.getAcountUsingId(accountId);

	if (!account) throw ({ status: false, error: "Account is not exist", statusCode: 403 });

	const { email, accountName, website } = req.body;

	const updateAccount = {
		email,
		accountName,
		website
	}

	 await accountRepository.updateAcountUsingId(accountId, updateAccount);

	return { data: "Updated successfully" };
}

const deleteAccount = async (req, res) => {
	const { accountId } = req.params;

	const account = await accountRepository.getAcountUsingId(accountId);

	if (!account) throw ({ status: false, error: "Account is not exist", statusCode: 403 });

	await destinationRepository.deleteDestinationsUsingAccountId(accountId)

	 await accountRepository.deleteAcountUsingId(accountId);

	return { data: "Deleted successfully" };
}

module.exports = {
	createAccount,
	getAccounts,
	updateAccount,
	deleteAccount
}