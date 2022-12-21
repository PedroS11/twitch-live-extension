import React, { useEffect, useState } from "react";
import { LogOutAccount } from "./LogOutAccount";
import { Divider, List } from "@mui/material";
import { Notifications } from "./Notifications";
import { useTwitchStore } from "../../store/twitch";
import { ValidateTokenResponse } from "../../domain/twitch/api";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";

const Settings = () => {
	const loading = useTwitchStore((state) => state.loading);
	const getUser = useTwitchStore((state) => state.getUser);

	const [user, setUser] = useState<ValidateTokenResponse>();

	useEffect(() => {
		const getUserData = async () => {
			const userData: ValidateTokenResponse = await getUser();

			setUser(userData);
		};

		getUserData();
	}, []);

	return (
		<>
			{user && (
				<List>
					<LogOutAccount user={user} />
					<Notifications />
				</List>
			)}
			{loading && !user && <CircularProgress />}
			<Divider />
		</>
	);
};

export default Settings;
