/** @format */

import React from "react";
import "typeface-roboto";

import {
	createMuiTheme,
	makeStyles,
	ThemeProvider
} from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import Home from "./pages/home";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[700]
		},
		secondary: {
			main: blue[50]
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

const App = () => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						News
					</Typography>
				</Toolbar>
				<Home />
			</AppBar>
		</ThemeProvider>
	);
};

export default App;
