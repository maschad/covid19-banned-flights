/** @format */

import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import MapChart from "../components/MapChart";

const Home = () => {
	const [content, setContent] = useState("");
	return (
		<div>
			<MapChart setTooltipContent={setContent} />
			<ReactTooltip>{content}</ReactTooltip>
		</div>
	);
};

export default Home;
