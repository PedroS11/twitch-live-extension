import React from "react";
import { BottomNavigation, BottomNavigationAction, BottomNavigationProps } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import ExploreIcon from "@mui/icons-material/Explore";
import { styled } from "@mui/material/styles";
import darkTheme from "../../../theme/darkTheme";

const FooterWrapper = styled(BottomNavigation)<BottomNavigationProps>(() => ({
	"& .Mui-selected, .Mui-selected > svg": {
		color: "rgb(190,154,252)",
	},
	height: 50,
	backgroundColor: darkTheme.palette.background.default,
}));

export const Footer = () => {
	const [value, setValue] = React.useState(0);

	return (
		<>
			<FooterWrapper
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction label="Favorites" component={Link} to="/" icon={<FavoriteIcon />} />
				<BottomNavigationAction label="Explore" component={Link} to="/explore" icon={<ExploreIcon />} />
				<BottomNavigationAction label="Settings" component={Link} to="/settings" icon={<SettingsIcon />} />
			</FooterWrapper>
		</>
	);
};
