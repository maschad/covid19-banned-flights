/** @format */

import React, { memo, useState } from "react";
import {
	ZoomableGroup,
	ComposableMap,
	Geographies,
	Geography
} from "react-simple-maps";

import allCountries from "../lib/countryList.js";

const geoUrl =
	"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ bannedCountries, setTooltipContent }) => {
	const [fillBannedCountries, setFilledBannedCountries] = useState([]);

	const handleChangeCountry = name => {
		if (bannedCountries[name]) {
			const { allPersons, allForeigners, selectNations } = bannedCountries[
				name
			];

			if (allPersons) {
				setFilledBannedCountries(allCountries.map(country => country));
				setTooltipContent(
					` ${name}'s Ports Closed, ALL incoming flights, including citizens banned.`
				);
			} else if (allForeigners) {
				setFilledBannedCountries(
					allCountries.filter(country => country !== name)
				);
				setTooltipContent(
					`${name} ONLY citizens allowed, ALL other incoming flights banned`
				);
			} else {
				setFilledBannedCountries(selectNations);
				setTooltipContent(
					`${name} has banned flights from the following countries ${selectNations.map(
						nation => nation
					)}`
				);
			}
		} else {
			setTooltipContent(`${name} — No banned flights`);
		}
	};

	return (
		<ComposableMap data-tip='' projectionConfig={{ scale: 200 }}>
			<ZoomableGroup>
				<Geographies geography={geoUrl}>
					{({ geographies }) =>
						geographies.map(geo => {
							const { NAME } = geo.properties;
							const country = fillBannedCountries.find(
								country => country === NAME
							);
							return (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onMouseEnter={() => {
										handleChangeCountry(NAME);
									}}
									onMouseLeave={() => {}}
									fill={country ? "#D13D16" : "#F5F4F6"}
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
