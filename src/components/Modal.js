/** @format */
import React from "react";
import clsx from "clsx";
import { Button, makeStyles, Modal, Typography } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles(theme => ({
	modal: {
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
	mobileModal: {
		top: "25%",
		left: "25%",
		transform: "translate(-25%, -25%)",
		width: 200
	}
}));

const CustomModal = ({
	address,
	copied,
	copyToClipboard,
	handleModal,
	matches,
	modal,
	modalContent
}) => {
	const classes = useStyles();

	const typography = {
		fontSize: 15
	};

	const mobileTypography = {
		fontSize: 9
	};

	const renderModalBody = (
		<div className={clsx(classes.modal, { [classes.mobileModal]: !matches })}>
			{modalContent}
			<Button
				startIcon={<FileCopyIcon />}
				onClick={() => copyToClipboard(address)}
			/>
			<Typography style={{ ...(matches ? typography : mobileTypography) }}>
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
