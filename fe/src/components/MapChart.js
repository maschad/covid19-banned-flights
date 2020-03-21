/** @format */

import React, { memo, useState } from "react";
import {
	ZoomableGroup,
	ComposableMap,
	Geographies,
	Geography
} from "react-simple-maps";

import allCountries from "../lib/countries.json";

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
				setFilledBannedCountries(allCountries.map(country => country.name));
				setTooltipContent(
					` ${name} 's Ports Closed, ALL incoming flights, including citizens banned.`
				);
			} else if (allForeigners) {
				setFilledBannedCountries(
					allCountries.filter(country => {
						if (country.name != name) return country.name;
					})
				);
				setTooltipContent(
					`${name} only citizens allowed, ALL other incoming flights banned`
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
							const country = fillBannedCountries.find(
								country => country == country
							);
							return (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onMouseEnter={() => {
										const { NAME } = geo.properties;
										handleChangeCountry(NAME);
									}}
									onMouseLeave={() => {}}
									style={{
										default: {
											fill: "#D6D6DA",
											outline: "none"
										},
										hover: {
											fill: "#16D146",
											outline: "none"
										}
									}}
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
