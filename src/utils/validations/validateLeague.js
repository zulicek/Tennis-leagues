export const validateLeague = ({ name, startDate, clubName, address, tel, surface, type }) => {
	let errors = {};

	if (!name) {
		errors.name = "Name can't be empty";
	}

	if (!startDate) {
		errors.startDate = "Date can't be empty";
	}

	if (!clubName) {
		errors.clubName = "Club name can't be empty";
	}

	if (!surface) {
		errors.surface = "Surface can't be empty";
	}

	if (!type) {
		errors.type = "Type can't be empty";
	}

	return errors;
};
