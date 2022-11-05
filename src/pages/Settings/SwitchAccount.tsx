import React from "react";
import {
	IconButton,
	IconButtonProps,
	ListItem,
	ListItemIcon,
	ListItemIconProps,
	ListItemProps,
	ListItemSecondaryAction,
	ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ValidateTokenResponse } from "../../domain/twitch/api";
import { styled } from "@mui/material/styles";

interface SwitchAccountProps {
	user: ValidateTokenResponse;
}

const Wrapper = styled(ListItem)<ListItemProps>(() => ({
	height: 50,
	paddingRight: 45,
}));

const UserIcon = styled(ListItemIcon)<ListItemIconProps>(() => ({
	minWidth: 40,
}));

const LoggedInUserText = styled("span")(() => ({
	fontWeight: "bold",
}));

const SwitchAccountButton = styled(IconButton)<IconButtonProps>(() => ({
	textTransform: "none",
	backgroundColor: "rgba(169, 112, 255, 0.4)",
	"&:hover": {
		backgroundColor: "rgba(169, 112, 255, 0.6)",
	},
}));

export const SwitchAccount = ({ user }: SwitchAccountProps) => {
	// const classes = useStyles();
	// const dispatch: AppDispatch = useDispatch();
	//
	// const { loading } = useSelector((state: RootState) => state.common);

	return (
		<Wrapper dense>
			<UserIcon>
				<PersonIcon />
			</UserIcon>
			<ListItemText
				primary={
					<span>
						Logged in as <LoggedInUserText>{user?.login}</LoggedInUserText>
					</span>
				}
			/>
			<ListItemSecondaryAction>
				<SwitchAccountButton
					edge="end"
					aria-label="delete"
					size={"small"}
					disabled={false}
					// onClick={async () => await dispatch(switchAccount())}
				>
					<ExitToAppIcon />
				</SwitchAccountButton>
			</ListItemSecondaryAction>
		</Wrapper>
	);
};
