/** @format */

import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import MapChart from "../components/MapChart";
import { scrapeData } from "../lib/scraper";

const Home = () => {
	useEffect(() => {
		/**
		 * JSON @schema
		 * {
		 *  "countryName": [... banned countries]
		 * }
		 */
		const fetchData = async () => {
			const results = await scrapeData();
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
