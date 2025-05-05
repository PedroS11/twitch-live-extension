import React from "react";
import { Button, Grid, Icon, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { refreshToken } from "../../infrastructure/twitch/twitchHelpers";

const LoginButton = styled(Button)<IconButtonProps>(() => ({
	color: "white",
	borderColor: "rgba(169, 112, 255, 0.4)",
	"&:hover": {
		borderColor: "rgba(169, 112, 255, 0.6)",
	},
	textTransform: "none",
}));

export const LoginToTwitch = () => {
	const svgIcon = (
		<Icon sx={{ display: "flex", alignItems: "center" }}>
			<img alt="edit" src="/icon.png" width={20} height={20} />
		</Icon>
	);
	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			sx={{ marginBottom: "10px" }}
		>
			<LoginButton
				variant="outlined"
				endIcon={svgIcon}
				onClick={async () => {
					await refreshToken(true);
				}}
			>
				Log in with Twitch
			</LoginButton>
		</Grid>
	);
};
