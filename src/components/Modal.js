/** @format */
import React from "react";
import { makeStyles, Modal, Paper, Zoom } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	modal: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #FFF",
		borderRadius: 10,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(5),
		position: "absolute",
		[theme.breakpoints.up("lg")]: {
			top: "27%",
			left: "28%",
			transform: "translate(-30%, -30%)",
			width: 450
		},
		[theme.breakpoints.down("md")]: {
			top: "20%",
			left: "25%",
			width: 450
		},
		[theme.breakpoints.down("sm")]: {
			top: "18%",
			left: "10%",
			width: 268
		},
		[theme.breakpoints.down("xs")]: {
			top: "14%",
			left: "5%",
			width: 202
		},
		outline: "none"
	}
}));

const CustomModal = ({ handleModal, modal, modalContent }) => {
	const classes = useStyles();

	const renderModalBody = (
		<Paper elevation={4} className={classes.modal}>
			{modalContent}
		</Paper>
	);

	return (
		<Modal
			open={modal}
			onClose={() => handleModal(false)}
			aria-labelledby='modal-title'
			aria-describedby='modal-description'>
			<Zoom in={modal}>{renderModalBody}</Zoom>
		</Modal>
	);
};

export default CustomModal;
