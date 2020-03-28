/** @format */

import React from "react";
import "typeface-roboto";

import {
	createMuiTheme,
	makeStyles,
	ThemeProvider
} from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
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
	fab: {
		position: "absolute",
		bottom: theme.spacing(-10)
	},
	title: {
		flexGrow: 1
	}
}));

const App = () => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						COVID19 Flight Info
					</Typography>
					<Typography></Typography>
					<Button color='inherit' startIcon={<FavoriteIcon />}>
						Show some love :)
					</Button>
				</Toolbar>
			</AppBar>
			<Home />
		</ThemeProvider>
	);
};

export default App;
