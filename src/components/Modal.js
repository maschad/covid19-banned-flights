/** @format */
import React from "react";
import { Button, makeStyles, Modal, Typography } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles(theme => ({
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
	}
}));

const CustomModal = ({
	address,
	copied,
	copyToClipboard,
	handleModal,
	modal,
	modalContent
}) => {
	const classes = useStyles();

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
	return (
		<Modal
			open={modal}
			onClose={() => handleModal(false)}
			aria-labelledby='simple-modal-title'
			aria-describedby='simple-modal-description'>
			{renderModalBody}
		</Modal>
	);
};

export default CustomModal;
