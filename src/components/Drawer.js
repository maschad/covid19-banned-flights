/** @format */

import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Typography
} from "@material-ui/core";

import { Icon } from "@iconify/react";
import bitcoinIcon from "@iconify/icons-mdi/bitcoin";
import ethereumIcon from "@iconify/icons-mdi/ethereum";

const useStyles = makeStyles(() => ({
	list: {
		width: 250
	},
	titleText: {
		justifyContent: "center",
		alignItems: "center",
		inset: "auto"
	}
}));

const CustomDrawer = ({ drawerState, sendViaQR, toggleDrawer }) => {
	const classes = useStyles();

	const cryptoList = (
		<div
			className={classes.list}
			role='presentation'
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}>
			<List>
				<ListItem>
					<ListItemText>
						<Typography className={classes.titleText}>
							Show some love without borders and bank fees :){" "}
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem button onClick={() => sendViaQR("Ethereum")}>
					<ListItemIcon>
						<Icon icon={ethereumIcon} />
					</ListItemIcon>
					<ListItemText primary='ETH' />
				</ListItem>
				<ListItem button onClick={() => sendViaQR("Bitcoin")}>
					<ListItemIcon>
						<Icon icon={bitcoinIcon} />
					</ListItemIcon>
					<ListItemText primary='BTC' />
				</ListItem>
			</List>
		</div>
	);

	return (
		<React.Fragment key='right'>
			<Drawer anchor={"right"} open={drawerState} onClose={toggleDrawer(false)}>
				{cryptoList}
			</Drawer>
		</React.Fragment>
	);
};

export default CustomDrawer;
