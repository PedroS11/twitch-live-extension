import React, { useEffect } from "react";

import { Link, LinkProps, Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)<TypographyProps>(() => ({
	marginBottom: 5,
}));

const StyledLink = styled(Link)<LinkProps>(() => ({
	color: "#FFF",
	"&:hover": {
		color: "#aaaaaa",
	},
}));

export const Header = () => {
	return (
		<StyledTypography variant={"h4"} align={"center"}>
			<StyledLink
				target="_blank"
				rel="noopener noreferrer"
				href="https://twitch.tv"
				underline={"none"}
			>
				Twitch Live
			</StyledLink>
		</StyledTypography>
	);
};
