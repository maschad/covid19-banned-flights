/** @format */
import React from "react";

import { ResponsiveLine } from "@nivo/line";

const Chart = ({ data }) => {
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: "auto",
				max: "auto",
				stacked: false,
				reverse: false
			}}
			curve='natural'
			axisTop={null}
			axisRight={null}
			axisBottom={null}
			axisLeft={{
				orient: "left",
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "count",
				legendOffset: -40,
				legendPosition: "middle"
			}}
			enableGridX={false}
			enableGridY={false}
			colors={{ scheme: "nivo" }}
			lineWidth={3}
			enablePoints={false}
			pointColor={{ theme: "background" }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabel='persons'
			pointLabelYOffset={-12}
			enableArea={true}
			useMesh={true}
			legends={[
				{
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: "left-to-right",
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: "circle",
					symbolBorderColor: "rgba(0, 0, 0, .5)",
					effects: [
						{
							on: "hover",
							style: {
								itemBackground: "rgba(0, 0, 0, .03)",
								itemOpacity: 1
							}
						}
					]
				}
			]}
		/>
	);
};

export default Chart;
