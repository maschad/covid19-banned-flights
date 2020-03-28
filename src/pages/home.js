/** @format */

import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import MapChart from "../components/MapChart";

import { getResults } from "../lib/httpClient";

const Home = () => {
	useEffect(() => {
		/**
		 * JSON @schema
		 * {
		 *  "countryName": [...info on banned countries]
		 * }
		 */
		const fetchData = async () => {
			const results = await getResults();
			setBannedCountries(results);
		};
		fetchData();
	});

	const [bannedCountries, setBannedCountries] = useState("");
	const [content, setContent] = useState("");
	return (
		<div>
			<MapChart
				bannedCountries={bannedCountries}
				setTooltipContent={setContent}
			/>
			<ReactTooltip>{content}</ReactTooltip>
		</div>
	);
};

export default Home;
