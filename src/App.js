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
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Modal
} from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";

import { Icon } from "@iconify/react";
import bitcoinIcon from "@iconify/icons-mdi/bitcoin";
import ethereumIcon from "@iconify/icons-mdi/ethereum";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import QRCode from "qrcode.react";

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
	paper: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #FFF",
		borderRadius: 10,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		outline: "none"
	},
	list: {
		width: 250
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

	const copyToClipboard = value => {
		navigator.clipboard.writeText(value);
		setCopied(true);
	};

	const sendViaQR = type => {
		let address,
			icon = "";
		if (type === "BTC") {
			address = BTCAddress;
			icon = bitcoinIcon;
			setAddress(address);
		} else {
			address = ETHAddress;
			icon = ethereumIcon;
			setAddress(address);
		}
		setModalContent(
			<Container maxWidth='lg'>
				<div style={{ marginLeft: 150 }}>
					<Icon
						icon={icon}
						style={{
							width: 100,
							height: 100
						}}
					/>
				</div>
				<Typography variant='body1'>
					Scan this QR Code with your wallet
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

	/**To integrate web modal so ether is easier to send */
	const sendEther = () => {};

	const handleModal = value => {
		setModal(value);
	};

	const renderModalBody = (
		<div className={classes.paper}>
			{modalContent}
			<Button
				startIcon={<FileCopyIcon />}
				onClick={() => copyToClipboard(address)}
			/>
			<Typography variant='body1'>
				{copied ? "Copied!" : `Or Copy this Address: ${address}`}
			</Typography>
		</div>
	);

	const modalBody = (
		<Modal
			open={modal}
			onClose={() => handleModal(false)}
			aria-labelledby='simple-modal-title'
			aria-describedby='simple-modal-description'>
			{renderModalBody}
		</Modal>
	);

	const toggleDrawer = value => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerState(value);
	};

	const cryptoList = (
		<div
			className={classes.list}
			role='presentation'
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}>
			<List>
				<ListItem button onClick={() => sendViaQR("ETH")}>
					<ListItemIcon>
						<Icon icon={ethereumIcon} />
					</ListItemIcon>
					<ListItemText primary='ETH' />
				</ListItem>
				<ListItem button onClick={() => sendViaQR("BTC")}>
					<ListItemIcon>
						<Icon icon={bitcoinIcon} />
					</ListItemIcon>
					<ListItemText primary='BTC' />
				</ListItem>
			</List>
		</div>
	);

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
						Show some love :)
					</Button>
				</Toolbar>
			</AppBar>
			<React.Fragment key='right'>
				<Drawer
					anchor={"right"}
					open={drawerState}
					onClose={toggleDrawer(false)}>
					{cryptoList}
				</Drawer>
			</React.Fragment>
			<Home />
			{modalBody}
		</ThemeProvider>
	);
};

export default App;