import React from "react";
import { SwitchAccount } from "./SwitchAccount";
import { List, Divider } from "@mui/material";
import { Notifications } from "./Notifications";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";

export const Settings = () => {
	return (
		<>
			<List>
				<SwitchAccount user={undefined} />
				<Notifications />
			</List>
			<CircularProgress />
			<Divider />
		</>
	);
};
