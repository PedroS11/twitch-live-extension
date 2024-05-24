import React from "react";
import { Paper, PaperProps, Popper, PopperProps, Typography, TypographyProps } from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled(Popper)<PopperProps>(
	() =>
		({
			pointerEvents: "none",
			maxWidth: 300,
			// https://github.com/mui/material-ui/issues/30569
		} as any),
);

const GreyPaper = styled(Paper)<PaperProps>(() => ({
	backgroundColor: "#383737",
}));

const TitleText = styled(Typography)<TypographyProps>(() => ({
	padding: 5,
}));

interface PoppertTitleProps {
	open: boolean;
	anchorEl: HTMLElement | null;
	title: string;
}

export const PopperTitle = ({ open, anchorEl, title }: PoppertTitleProps) => {
	return (
		<Wrapper open={open} anchorEl={anchorEl} placement={"bottom-start"}>
			<GreyPaper>
				<TitleText variant={"subtitle2"} noWrap>
					{title}
				</TitleText>
			</GreyPaper>
		</Wrapper>
	);
};
