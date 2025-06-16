import React, { useEffect, useState } from "react";
import { LogOutAccount } from "./LogOutAccount";
import { List } from "@mui/material";
import { Notifications } from "./Notifications";
import { useTwitchStore } from "../../store/twitch";
import { ValidateTokenResponse } from "../../domain/twitch/api";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";
import { BadgeIcon } from "./BadgeIcon";
import { RefreshToken } from "./RefreshToken";

const Settings = () => {
	const loading = useTwitchStore((state) => state.loading);
	const getUser = useTwitchStore((state) => state.getUser);

	const [user, setUser] = useState<ValidateTokenResponse | undefined>();

	useEffect(() => {
		const getUserData = async () => {
			const userData: ValidateTokenResponse | undefined = await getUser();

			setUser(userData);
		};

		getUserData();
	}, []);

	return (
		<>
			{user && (
				<List>
					<LogOutAccount user={user} />
					<RefreshToken />
					<Notifications />
					<BadgeIcon />
				</List>
			)}
			{!user && !loading && (
				<List>
					<RefreshToken />
				</List>
			)}
			{loading && !user && <CircularProgress />}
		</>
	);
};

export default Settings;
