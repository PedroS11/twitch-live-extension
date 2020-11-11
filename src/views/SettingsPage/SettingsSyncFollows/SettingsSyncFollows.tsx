import React, { useEffect, useState } from 'react';
import {
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';
import { syncFollows } from '../../../store/reducers/twitchReducer';
import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { getStorageData } from '../../../utils/localStorage';
import { LAST_FOLLOWS_UPDATE_KEY } from '../../../domain/store/twitchStore';
import GroupIcon from '@material-ui/icons/Group';
import { formatDate } from '../../../utils/formatter';

const useStyles = makeStyles({
    root: {
        height: 50,
        paddingRight: 45,
    },
    button: {
        textTransform: 'none',
        backgroundColor: 'rgba(246, 83, 83, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(246, 83, 83, 0.6)',
        },
    },
    icon: {
        minWidth: 40,
    },
});
export const SettingsSyncFollows = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const [lastUpdate, setLastUpdate] = useState<Date>();

    useEffect(() => {
        const timestamp = getStorageData(LAST_FOLLOWS_UPDATE_KEY);
        if (timestamp) {
            setLastUpdate(new Date(+timestamp));
        }
    }, [dispatch]);

    const syncData = async () => {
        await dispatch(syncFollows());
        const timestamp = getStorageData(LAST_FOLLOWS_UPDATE_KEY);

        if (timestamp) {
            setLastUpdate(new Date(+timestamp));
        }
    };

    const { loading } = useSelector((state: RootState) => state.common);

    return (
        <ListItem className={classes.root} dense>
            <ListItemIcon className={classes.icon}>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText
                primary={'Follows'}
                secondary={
                    <Typography noWrap variant={'subtitle2'} color={'textSecondary'}>
                        Last sync: {lastUpdate ? formatDate(lastUpdate) : 'Never'}
                    </Typography>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    size={'small'}
                    className={classes.button}
                    disabled={loading}
                    onClick={async () => await syncData()}
                >
                    <SyncIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
