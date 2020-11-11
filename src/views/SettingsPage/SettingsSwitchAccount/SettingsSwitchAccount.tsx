import React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { switchAccount } from '../../../store/reducers/twitchReducer';
import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import PersonIcon from '@material-ui/icons/Person';
import { ValidateTokenResponse } from '../../../domain/infrastructure/twitch/twitch';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface SettingsSwitchAccountProps {
    user: ValidateTokenResponse;
}

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
export const SettingsSwitchAccount = ({ user }: SettingsSwitchAccountProps) => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const { loading } = useSelector((state: RootState) => state.common);

    return (
        <ListItem className={classes.root} dense>
            <ListItemIcon className={classes.icon}>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText
                primary={
                    <span>
                        Logged in as <span className={classes.user}>{user?.login}</span>
                    </span>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    size={'small'}
                    className={classes.button}
                    disabled={loading}
                    onClick={async () => await dispatch(switchAccount())}
                >
                    <ExitToAppIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
