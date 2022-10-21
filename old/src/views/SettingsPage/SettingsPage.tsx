import React, { useEffect, useState } from 'react';
import { Divider, List } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/reducers/twitchReducer';
import { RootState } from '../../store/reducers/rootReducer';
import { AppDispatch } from '../../store/store';
import { SettingsSwitchAccount } from './SettingsSwitchAccount/SettingsSwitchAccount';
import { ValidateTokenResponse } from '../../domain/infrastructure/twitch/twitch';
import { CenteredCircularProgress } from '../../components/Progress/CenteredCircularProgress';
import { SettingsNotifications } from './SettingsNotifications/SettingsNotifications';

export const SettingsPage = () => {
    const dispatch: AppDispatch = useDispatch();

    const [user, setUser] = useState<ValidateTokenResponse>();
    const { loading } = useSelector((state: RootState) => state.common);

    useEffect(() => {
        const getUserData = async () => {
            const userData: ValidateTokenResponse = await dispatch(getUser());

            setUser(userData);
        };

        getUserData();
    }, [dispatch]);

    return (
        <div>
            {user && (
                <List>
                    <SettingsSwitchAccount user={user} />
                    <SettingsNotifications />
                </List>
            )}
            {loading && !user && <CenteredCircularProgress />}
            <Divider />
        </div>
    );
};
