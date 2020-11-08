import React, { useEffect, useState } from 'react';
import { Divider, List, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SettingsFooter } from './SettingsFooter/SettingsFooter';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/reducers/twitchReducer';
import { RootState } from '../../store/reducers/rootReducer';
import { AppDispatch } from '../../store/store';
import { SettingsSyncFollows } from './SettingsSyncFollows/SettingsSyncFollows';
import { SettingsSwitchAccount } from './SettingsSwitchAccount/SettingsSwitchAccount';
import { ValidateTokenResponse } from '../../domain/infrastructure/twitch/twitch';
import { CenteredCircularProgress } from '../../components/Progress/CenteredCircularProgress';

const useStyles = makeStyles({
    list: {
        marginBottom: -5,
    },
    emptyListMessage: {
        fontStyle: 'italic',
    },
});

export const SettingsPage = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const [user, setUser] = useState<ValidateTokenResponse>({} as ValidateTokenResponse);
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
            {!loading && user && (
                <List subheader={<ListSubheader>Settings</ListSubheader>}>
                    <SettingsSwitchAccount user={user} />
                    <SettingsSyncFollows />
                </List>
            )}
            {loading && <CenteredCircularProgress />}
            <Divider />
            <SettingsFooter />
        </div>
    );
};
