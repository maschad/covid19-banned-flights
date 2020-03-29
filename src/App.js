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
	Container,
	Toolbar,
	Typography
} from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Icon } from "@iconify/react";
import bitcoinIcon from "@iconify/icons-mdi/bitcoin";
import ethereumIcon from "@iconify/icons-mdi/ethereum";

import FavoriteIcon from "@material-ui/icons/Favorite";

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
	const [address, setAddress] = useState("");

	const matches = useMediaQuery("(min-width:600px)");

	const copyToClipboard = value => {
		navigator.clipboard.writeText(value);
		setCopied(true);
	};

	const sendViaQR = type => {
		let address,
			icon = "";
		if (type === "Bitcoin") {
			address = BTCAddress;
			icon = bitcoinIcon;
			setAddress(address);
		} else {
			address = ETHAddress;
			icon = ethereumIcon;
			setAddress(address);
		}

		const iconStyles = {
			height: 100,
			width: 100,
			marginLeft: 130
		};
		const mobileIconStyles = {
			height: 50,
			width: 50,
			marginLeft: 55,
			marginBottom: 10
		};
		setModalContent(
			<Container maxWidth='lg'>
				<Icon
					icon={icon}
					style={{
						...(matches ? iconStyles : mobileIconStyles)
					}}
				/>
				<Typography variant='body1'>
					{`Scan this QR Code with your ${type} wallet`}
				</Typography>
				<Box
					justifyContent='center'
					alignItems='center'
					display='flex'
					padding={5}>
					<QRCode value={address} size={256} />
				</Box>
			</Container>
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
						startIcon={<FavoriteIcon />}
						onClick={toggleDrawer(true)}>
						{matches ? "Show some love :)" : null}
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
				address={address}
				copied={copied}
				copyToClipboard={copyToClipboard}
				handleModal={handleModal}
				matches={matches}
				modal={modal}
				modalContent={modalContent}
			/>
		</ThemeProvider>
	);
};

export default App;
