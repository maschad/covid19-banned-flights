/** @format */

import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import MapChart from "../components/MapChart";

const Home = () => {
	// const [bannedCountries, setBannedCountries] = useState("");
	const [content, setContent] = useState("");

	const bannedCountries = {
		Brazil: {
			allPersons: true,
			allForeigners: false,
			selectNations: []
		},

		Canada: {
			allPersons: false,
			allForeigners: true,
			selectNations: []
		},
		"United States of America": {
			allPersons: false,
			allForeigners: false,
			selectNations: ["France", "Germany", "Italy", "Spain"]
		}
	};

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
