/** @format */

import React, { memo, useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const MapChart = data => {
	const globeEl = useRef();

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
		/>
	);
};

export default memo(MapChart);
