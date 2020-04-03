/** @format */

export const sanitizeCountryNames = countryName => {
	switch (countryName) {
		case "Democratic Republic of the Congo":
			countryName = "Congo (Kinshasa)";
			break;

		case "Republic of Congo":
			countryName = "Congo (Brazzaville)";
			break;

		case "South Korea":
			countryName = "Korea, South";
			break;

		case "United States of America":
			countryName = "US";
			break;

		case "United Republic of Tanzania":
			countryName = "Tanzania";
			break;
		default:
			break;
	}

	return countryName;
};
