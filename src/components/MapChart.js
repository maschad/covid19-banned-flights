/** @format */

import React, { memo, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import moment from "moment";

const MapChart = ({ countryData }) => {
	const globeEl = useRef();
	const [hoverD, setHoverD] = useState();
	const [countries, setCountries] = useState({ features: [] });

	useEffect(() => {
		// Auto-rotate
		globeEl.current.controls().autoRotate = true;
		globeEl.current.controls().autoRotateSpeed = 0.1;

		//Get Country info
		fetch("./countries.json")
			.then(res => res.json())
			.then(setCountries);
	}, []);

	const todaysData = countryName => {
		if (countryData[countryName] !== undefined) {
			return countryData[countryName].find(
				data => data.date === moment().format("YYYY-M-DD")
			);
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
			globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
			backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
			polygonsData={countries.features}
			polygonAltitude={d => (d === hoverD ? 0.12 : 0.06)}
			polygonCapColor={d => (d === hoverD ? "green" : "black")}
			polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
			polygonStrokeColor={() => "#111"}
			polygonLabel={({ properties: d }) => getPolygonLabel(d)}
			onPolygonHover={setHoverD}
			polygonsTransitionDuration={300}
		/>
	);
};

export default memo(MapChart);
