/** @format */

import axios from "axios";

const url = `${process.env.REACT_APP_SCRAPER_URL}`;

export const getResults = async () => {
	const results = await axios(url).catch(error =>
		console.log("Error: ", error)
	);

	return results.data;
};
