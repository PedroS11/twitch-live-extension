import React from "react";
import { CircularProgress as Progress, CircularProgressProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")(() => ({
	display: "flex",
	justifyContent: "center",
	paddingTop: 10,
	paddingBottom: 10,
}));

const WhiteProgress = styled(Progress)<CircularProgressProps>(() => ({
	color: "#FFFFFF",
}));

export const CircularProgress = () => (
	<Wrapper>
		<WhiteProgress size={30} />
	</Wrapper>
);
