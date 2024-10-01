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
import GroupsIcon from "@mui/icons-material/Groups";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import {
	isBadgeIconFlagEnabled,
	storeBadgeIconFlagOnStorage,
} from "../../infrastructure/localStorage/localStorageService";
import { useTwitchStore } from "../../store/twitch";
import {
	sendDisableBadgeIconMessage,
	sendEnableBadgeIconMessage,
	updateBadgeIcon,
} from "../../infrastructure/background/messageWrapper";

const Wrapper = styled(ListItem)<ListItemProps>(() => ({
	height: 50,
	paddingRight: 45,
}));

const Icon = styled(ListItemIcon)<ListItemIconProps>(() => ({
	minWidth: 40,
}));

const BadgeIconSwitch = styled(Switch)<SwitchProps>(() => ({
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

export const BadgeIcon = () => {
	const [badgeIconFlag, setBadgeIconFlag] = useState<boolean>(true);

	const { livestreams, loading } = useTwitchStore((state) => ({
		livestreams: state.livestreams,
		loading: state.loading,
	}));

	useEffect(() => {
		const getFlag = async () => {
			const flag = await isBadgeIconFlagEnabled();
			setBadgeIconFlag(flag);
		};
		getFlag();
	}, []);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setBadgeIconFlag(event.target.checked);
		await storeBadgeIconFlagOnStorage(event.target.checked);

		if (event.target.checked) {
			await sendEnableBadgeIconMessage();
			await updateBadgeIcon(livestreams.length);
		} else {
			await sendDisableBadgeIconMessage();
			await updateBadgeIcon(null);
		}
	};

	return (
		<Wrapper dense>
			<Icon>
				<GroupsIcon />
			</Icon>
			<ListItemText primary={<span>Show number of live streams</span>} />
			<ListItemSecondaryAction>
				<BadgeIconSwitch
					checked={badgeIconFlag}
					onChange={async (e) => await handleChange(e)}
					name="badge-icon-state"
					color="primary"
					inputProps={{ "aria-label": "secondary checkbox" }}
					disabled={loading}
				/>
			</ListItemSecondaryAction>
		</Wrapper>
	);
};
