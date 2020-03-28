/** @format */

import React, { memo } from "react";
import {
	ZoomableGroup,
	ComposableMap,
	Geographies,
	Geography
} from "react-simple-maps";

const geoUrl =
	"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ bannedCountries, setTooltipContent }) => {
	const handleChangeCountry = name => {
		// Some disparities in how MapCharts stores names versus what is returned
		// This is just some minimal data cleaning
		switch (name) {
			case "United States of America":
				name = "United States";
				break;
			default:
				break;
		}

		if (bannedCountries[name]) {
			setTooltipContent(
				`${name}:  ${bannedCountries[name].map(info => info.toString())}`
			);
		} else {
			setTooltipContent(`${name} — No Info :(`);
		}
	};

	return (
		<ComposableMap data-tip='' projectionConfig={{ scale: 200 }}>
			<ZoomableGroup>
				<Geographies geography={geoUrl}>
					{({ geographies }) =>
						geographies.map(geo => {
							const { NAME } = geo.properties;

							return (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onMouseEnter={() => {
										handleChangeCountry(NAME);
									}}
									onMouseLeave={() => {}}
									style={{
										hover: {
											fill: "#36DA27",
											outline: "none"
										}
									}}
								/>
							);
						})
					}
				</Geographies>
			</ZoomableGroup>
		</ComposableMap>
	);
};

export default memo(MapChart);
