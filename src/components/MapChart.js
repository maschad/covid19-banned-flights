/** @format */

import React, { memo, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { sanitizeCountryNamesForCOVIDStats } from "../lib/utils";

const MapChart = ({ countryData, renderChart }) => {
	const globeEl = useRef();
	const [hoverD, setHoverD] = useState();
	const [countries, setCountries] = useState({ features: [] });

	useEffect(() => {
		// Auto-rotate
		globeEl.current.controls().autoRotate = true;
		globeEl.current.controls().autoRotateSpeed = 0.03;

		//Get Country info
		fetch("./countries.json")
			.then(res => res.json())
			.then(setCountries);
	}, []);

	const todaysData = countryName => {
		countryName = sanitizeCountryNamesForCOVIDStats(countryName);

		if (countryData[countryName] !== undefined) {
			return countryData[countryName][countryData[countryName].length - 1];
		} else {
			return "No info";
		}
	};

	const getPolygonLabel = data => {
		if (todaysData(data.ADMIN) === "No info") return "No Info";
		else
			return `
        <b>${data.ADMIN}</b> <br />
        <strong>Confirmed: </strong> <i>${
					todaysData(data.ADMIN).confirmed
				}</i><br/>
		<strong> Deaths: </strong> <i>${todaysData(data.ADMIN).deaths}</i><br/>
		<strong> Recovered: </strong> <i>${todaysData(data.ADMIN).recovered}</i><br/>
      `;
	};

	return (
		<Globe
			ref={globeEl}
			globeImageUrl={require("../assets/earth-night.jpg")}
			backgroundImageUrl={require("../assets/night-sky.png")}
			polygonsData={countries.features}
			polygonAltitude={d => (d === hoverD ? 0.12 : 0.06)}
			polygonCapColor={d => (d === hoverD ? "green" : "black")}
			polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
			polygonStrokeColor={() => "#111"}
			polygonLabel={({ properties: d }) => getPolygonLabel(d)}
			onPolygonHover={setHoverD}
			onPolygonClick={({ properties: d }) => renderChart(d.ADMIN)}
			polygonsTransitionDuration={300}
		/>
	);
};

export default memo(MapChart);
