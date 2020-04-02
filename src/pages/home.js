/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";

import {
	CircularProgress,
	makeStyles,
	Typography,
	Grid
} from "@material-ui/core";

import CustomModal from "../components/Modal";
import Chart from "../components/Chart";
import GlobeChart from "../components/MapChart";

import { getData } from "../lib/httpClient";
import CustomTab from "../components/Tab";

const url = `${process.env.REACT_APP_SCRAPER_URL}`;
const pomberUrl = "https://pomber.github.io/covid19/timeseries.json";

const useStyles = makeStyles(theme => ({
	chart: {
		flexGrow: 1,
		hegiht: 200
	},
	flightInfo: {
		flexGrow: 1,
		height: 100
	},
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

const Home = () => {
	const classes = useStyles();

	const [loading, setLoading] = useState(false);

	const [bannedCountries, setBannedCountries] = useState("");
	const [countryData, setCountryData] = useState({});

	const [modal, setModal] = useState(false);
	const [modalContent, setModalContent] = useState("");

	const [chartData, setChartData] = useState([]);

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
			const getData = type => {
				return countryData[name].map((stat, index) => {
					return {
						x: `Day ${index}`,
						y: stat[type]
					};
				});
			};

			setChartData([
				{
					id: "Confirmed",
					color: "hsl(40, 50%, 45%)",
					data: getData("confirmed")
				},
				{
					id: "Deaths",
					color: "hsl(0, 50%, 45%)",
					data: getData("deaths")
				},
				{
					id: "Recovered",
					color: "hsl(83, 70%, 50%)",
					data: getData("recovered")
				}
			]);

			handleModal(true);
			setModalContent(getModalContent(name, chartData));
		}
	};

	const getModalContent = (name, chartData) => {
		const tabTitles = ["Flight Info"];
		const tabContents = ["Basic Stats"];

		tabContents.push(
			<Grid className={classes.flightInfo}>
				<Typography variant='h3'>{name}</Typography>
				<Typography variant='body2'>{bannedCountries[name]}</Typography>
			</Grid>
		);

		tabContents.push(
			<Grid className={classes.chart}>
				<Typography variant='h3'>{name}</Typography>
				<Chart data={chartData} />
			</Grid>
		);

		return (
			<Grid>
				<CustomTab tabContents={tabContents} tabTitles={tabTitles} />
			</Grid>
		);
	};

	const handleModal = value => {
		setModal(value);
	};

	if (loading)
		return (
			<div>
				<CircularProgress className={classes.progress} />
			</div>
		);

	return (
		<div className={classes.root}>
			<div>
				<GlobeChart countryData={countryData} renderChart={renderChart} />
				<CustomModal
					handleModal={handleModal}
					modal={modal}
					modalContent={modalContent}
				/>
			</div>
		</div>
	);
};

export default Home;
