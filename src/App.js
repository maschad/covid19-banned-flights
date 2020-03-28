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
	Toolbar,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";

import { Icon } from "@iconify/react";
import bitcoinIcon from "@iconify/icons-mdi/bitcoin";
import ethereumIcon from "@iconify/icons-mdi/ethereum";

import FavoriteIcon from "@material-ui/icons/Favorite";

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
	list: {
		width: 250
	},
	title: {
		flexGrow: 1
	}
}));

const App = () => {
	const classes = useStyles();
	const [drawerState, setDrawerState] = useState(false);

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
				<ListItem button>
					<ListItemIcon>
						<Icon icon={bitcoinIcon} />
					</ListItemIcon>
					<ListItemText primary='BTC' />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<Icon icon={ethereumIcon} />
					</ListItemIcon>
					<ListItemText primary='ETH' />
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
		</ThemeProvider>
	);
};

export default App;
