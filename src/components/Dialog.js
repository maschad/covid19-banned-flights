/** @format */

import React from "react";
import {
	AppBar,
	Dialog,
	IconButton,
	makeStyles,
	Slide,
	Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const CustomDialog = ({ handleDialog, dialogContent, dialog }) => {
	const classes = useStyles();
	return (
		<div>
			<Dialog
				scroll='paper'
				fullScreen
				open={dialog}
				onClose={() => handleDialog(false)}
				TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={() => handleDialog(false)}
							aria-label='close'>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				{dialogContent}
			</Dialog>
		</div>
	);
};

export default CustomDialog;
