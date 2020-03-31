/** @format */

import React, { useState } from "react";
import "typeface-roboto";

import {
	createMuiTheme,
	makeStyles,
	ThemeProvider
} from "@material-ui/core/styles";

import { grey } from "@material-ui/core/colors";
import {
	AppBar,
	Button,
	Box,
	Hidden,
	Toolbar,
	Typography,
	Grid
} from "@material-ui/core";

import FileCopyIcon from "@material-ui/icons/FileCopy";

import FavoriteIcon from "@material-ui/icons/Favorite";
import GitHubIcon from "@material-ui/icons/GitHub";

import QRCode from "qrcode.react";

import CustomDrawer from "./components/Drawer";
import CustomModal from "./components/Modal";
import Home from "./pages/home";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: grey[900]
		},
		secondary: {
			main: grey[50]
		}
	}
});

const useStyles = makeStyles(theme => ({
	addressText: {
		textAlign: "center",
		marginTop: 15,
		[theme.breakpoints.down("md")]: {
			flexWrap: "wrap",
			fontSize: 10,
			marginTop: 10
		}
	},
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const BTCAddress = "bc1qppv3awnvxw7kas3zne6jcwj2w8a5uehaz3mn6q";
const ETHAddress = "0x6ed31d002338349E486daD57939E1e4A4A7a0007";

const App = () => {
	const classes = useStyles();

	const [drawerState, setDrawerState] = useState(false);

	const [modal, setModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	const [copied, setCopied] = useState(false);

	const copyToClipboard = value => {
		navigator.clipboard.writeText(value);
		setCopied(true);
	};

	const sendViaQR = type => {
		let address = "";
		if (type === "Bitcoin") {
			address = BTCAddress;
		} else {
			address = ETHAddress;
		}

		setModalContent(
			<Grid container spacing={4} justify='center' alignContent='center'>
				<Grid item alignItems='center' justify='center'>
					<Typography variant='body1'>
						Scan this QR Code with your <strong> {type}</strong> wallet
					</Typography>
				</Grid>
				<Box justifyContent='center' alignItems='center' display='flex'>
					<QRCode value={address} size={256} />
				</Box>
				<Button
					startIcon={<FileCopyIcon />}
					onClick={() => copyToClipboard(address)}
				/>
				<Typography className={classes.addressText}>
					{copied ? "Copied!" : `Or Copy this Address: ${address}`}
				</Typography>
			</Grid>
		);
		handleModal(true);
	};

	const handleModal = value => {
		setModal(value);
	};

	const toggleDrawer = value => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerState(value);
	};

	return (
		<ThemeProvider theme={theme}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						COVID19 Flight Info
					</Typography>

					<Button
						color='inherit'
						startIcon={<GitHubIcon />}
						href='https://github.com/maschad/covid19-banned-flights'
					/>
					<Button
						color='inherit'
						startIcon={<FavoriteIcon />}
						onClick={toggleDrawer(true)}>
						<Hidden only={["sm", "xs"]}>Show some love :)</Hidden>
					</Button>
				</Toolbar>
			</AppBar>
			<CustomDrawer
				drawerState={drawerState}
				sendViaQR={sendViaQR}
				toggleDrawer={toggleDrawer}
			/>
			<Home />
			<CustomModal
				handleModal={handleModal}
				modal={modal}
				modalContent={modalContent}
			/>
		</ThemeProvider>
	);
};

export default App;
