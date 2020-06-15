export const validateLeague = ({ name, date, clubName, address, tel, surface, type }) => {
	let errors = {};

	if (!name) {
		errors.name = "Name can't be empty";
	}

	if (!date) {
		errors.date = "Date can't be empty";
	}

	if (!clubName) {
		errors.clubName = "Club name can't be empty";
	}

	if (!address) {
		errors.address = "Address can't be empty";
	}

	if (!tel) {
		errors.tel = "Telephone can't be empty";
	}

	if (!surface) {
		errors.surface = "Surface can't be empty";
	}

	if (!type) {
		errors.type = "Type can't be empty";
	}

	return errors;
};
