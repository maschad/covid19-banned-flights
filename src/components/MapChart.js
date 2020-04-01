/** @format */

import React, { memo, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import countries from "../lib/countries.json";

const MapChart = ({ bannedCountries }) => {
	const globeEl = useRef();
	const [hoverD, setHoverD] = useState();

	useEffect(() => {
		// Auto-rotate
		globeEl.current.controls().autoRotate = true;
		globeEl.current.controls().autoRotateSpeed = 0.1;
	}, []);

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
			polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
        Population: <i>${d.POP_EST}</i>
      `}
			onPolygonHover={setHoverD}
			polygonsTransitionDuration={300}
		/>
	);
};

export default memo(MapChart);
