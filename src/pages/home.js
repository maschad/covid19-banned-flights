/** @format */

import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import axios from "axios";

import { CircularProgress, Modal, makeStyles } from "@material-ui/core";

import clsx from "clsx";

import MapChart from "../components/MapChart";
import Chart from "../components/Chart";

import { getData } from "../lib/httpClient";

const url = `${process.env.REACT_APP_SCRAPER_URL}`;
const pomberUrl = "https://pomber.github.io/covid19/timeseries.json";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	progress: {
		alignSelf: "center",
		justifySelf: "center",
		margin: theme.spacing(2)
	},
	modal: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		position: "absolute",
		height: 500,
		width: 800,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #FFF",
		borderRadius: 10,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		outline: "none"
	},
	mobileModal: {
		top: "25%",
		left: "25%",
		transform: "translate(-25%, -25%)",
		height: 295,
		width: 292
	}
}));

const Home = ({ matches }) => {
	const classes = useStyles();

	const [loading, setLoading] = useState(false);

	const [bannedCountries, setBannedCountries] = useState("");
	const [countryData, setCountryData] = useState({});

	const [content, setContent] = useState("");
	const [modal, setModal] = useState(false);

	const [chartData, setChartData] = useState([]);
	const [countryName, setCountryName] = useState("");

	useEffect(() => {
		const cancel = axios.CancelToken.source();

		const fetchData = async () => {
			setLoading(true);

			let results = await getData(url, cancel);
			setBannedCountries(results);

			results = await getData(pomberUrl, cancel);
			setCountryData(results);

			setLoading(false);
		};

		fetchData();

		return () => {
			cancel.cancel();
		};
	}, []);

	const renderChart = name => {
		switch (name) {
			case "United States of America":
				name = "US";
				break;
			default:
				break;
		}
		if (countryData[name] !== undefined) {
			const confirmedData = countryData[name].map((stat, index) => {
				return {
					x: index,
					y: stat.confirmed
				};
			});
			const deathsData = countryData[name].map((stat, index) => {
				return {
					x: index,
					y: stat.deaths
				};
			});

			const recoveredData = countryData[name].map((stat, index) => {
				return {
					x: index,
					y: stat.recovered
				};
			});
			setChartData([
				{
					id: "Confirmed",
					color: "hsl(40, 50%, 45%)",
					data: confirmedData
				},
				{
					id: "Deaths",
					color: "hsl(0, 50%, 45%)",
					data: deathsData
				},
				{
					id: "Recovered",
					color: "hsl(83, 70%, 50%)",
					data: recoveredData
				}
			]);
			setModal(true);
		}
	};

	const handleModal = value => {
		setModal(value);
	};

	const renderModalBody = (
		<div
			className={clsx(classes.modal, {
				[classes.mobileModal]: !matches
			})}>
			<Chart data={chartData} />
		</div>
	);

	return (
		<div className={classes.root}>
			{loading ? (
				<div>
					<CircularProgress className={classes.progress} />
				</div>
			) : (
				<div>
					<MapChart
						renderChart={renderChart}
						bannedCountries={bannedCountries}
						setTooltipContent={setContent}
					/>
					<ReactTooltip>{content}</ReactTooltip>
					<Modal
						open={modal}
						onClose={() => handleModal(false)}
						aria-labelledby='simple-modal-title'
						aria-describedby='simple-modal-description'>
						{renderModalBody}
					</Modal>
				</div>
			)}
		</div>
	);
};

export default Home;
