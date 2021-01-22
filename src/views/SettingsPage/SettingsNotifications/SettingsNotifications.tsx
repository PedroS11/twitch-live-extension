import React, { useEffect, useState } from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core';
import { switchAccount, updateNotificationsState } from '../../../store/reducers/twitchReducer';
import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { ValidateTokenResponse } from '../../../domain/infrastructure/twitch/twitch';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getStorageData, setStorageData } from '../../../utils/localStorage';
import { NOTIFICATIONS_ENABLE } from '../../../domain/store/twitchStore';

const useStyles = makeStyles({
    root: {
        height: 50,
        paddingRight: 45,
    },
    button: {
        textTransform: 'none',
        backgroundColor: 'rgba(169, 112, 255, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(169, 112, 255, 0.6)',
        },
    },
    user: {
        fontWeight: 'bold',
    },
    icon: {
        minWidth: 40,
    },
});

export const SettingsNotificatons = () => {
    const classes = useStyles();
    const [state, setState] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();

    const { loading } = useSelector((state: RootState) => state.common);

    useEffect(() => {
        setState(getStorageData(NOTIFICATIONS_ENABLE) == 'true');
    }, [dispatch]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.checked);
        await dispatch(updateNotificationsState(event.target.checked));
    };

    return (
        <ListItem className={classes.root} dense>
            <ListItemIcon className={classes.icon}>
                <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary={<span>Went live notifications</span>} />
            <ListItemSecondaryAction>
                <Switch
                    checked={state}
                    onChange={async (e) => await handleChange(e)}
                    name="notifications-state"
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    disabled={loading}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
};
