/** @format */

import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles
} from "@material-ui/core";

import { Icon } from "@iconify/react";
import bitcoinIcon from "@iconify/icons-mdi/bitcoin";
import ethereumIcon from "@iconify/icons-mdi/ethereum";

const useStyles = makeStyles(() => ({
	list: {
		width: 250
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
		<React.Fragment key='right'>
			<Drawer anchor={"right"} open={drawerState} onClose={toggleDrawer(false)}>
				{cryptoList}
			</Drawer>
		</React.Fragment>
	);
};

export default CustomDrawer;
