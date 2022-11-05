import React, { useEffect, useState } from "react";
import {
	ListItem,
	ListItemIcon,
	ListItemIconProps,
	ListItemProps,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
	SwitchProps,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const Wrapper = styled(ListItem)<ListItemProps>(() => ({
	height: 50,
	paddingRight: 45,
}));

const Icon = styled(ListItemIcon)<ListItemIconProps>(() => ({
	minWidth: 40,
}));

const NotificationSwitch = styled(Switch)<SwitchProps>(() => ({
	paddingRight: 0,
	width: 50,
	switchBase: {
		"&$checked": {
			color: blue[200],
			transform: "translateX(21px)",
		},
		"&$checked + $track": {
			backgroundColor: blue[200],
		},
	},
	checked: {},
	track: {},
}));

export const Notifications = () => {
	// const classes = useStyles();
	const [notificationsFlag, setNotificationsFlag] = useState<boolean>(false);
	// const dispatch: AppDispatch = useDispatch();
	//
	// const { loading } = useSelector((state: RootState) => state.common);

	// useEffect(() => {
	// 	setNotificationsFlag(getNotificationFlagFromStorage());
	// }, [dispatch]);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setNotificationsFlag(event.target.checked);
		// await dispatch(updateNotificationsState(event.target.checked));
	};

	return (
		<Wrapper dense>
			<Icon>
				<NotificationsIcon />
			</Icon>
			<ListItemText primary={<span>Just went live notification</span>} />
			<ListItemSecondaryAction>
				<NotificationSwitch
					checked={notificationsFlag}
					onChange={async (e) => await handleChange(e)}
					name="notifications-state"
					color="primary"
					inputProps={{ "aria-label": "secondary checkbox" }}
					// disabled={loading}
				/>
			</ListItemSecondaryAction>
		</Wrapper>
	);
};
