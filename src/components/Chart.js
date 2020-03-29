/** @format */
import React from "react";

import { ResponsiveBump } from "@nivo/bump";

const Chart = ({ data }) => {
	return (
		<ResponsiveBump
			data={data}
			margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
			colors={{ scheme: "orange_red" }}
			lineWidth={3}
			activeLineWidth={6}
			inactiveLineWidth={3}
			inactiveOpacity={0.15}
			pointSize={10}
			activePointSize={16}
			inactivePointSize={0}
			pointColor={{ theme: "background" }}
			pointBorderWidth={3}
			activePointBorderWidth={3}
			pointBorderColor={{ from: "serie.color" }}
			axisTop={null}
			axisRight={null}
			axisBottom={null}
			axisLeft={null}
		/>
	);
};

export default Chart;
