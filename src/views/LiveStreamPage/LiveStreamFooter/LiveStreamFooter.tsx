import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLiveStreams } from '../../../store/reducers/twitchReducer';
import { RootState } from '../../../store/reducers/rootReducer';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppDispatch } from '../../../store/store';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 8,
    },
    button: {
        textTransform: 'none',
        marginLeft: 10,
    },
});

export const LiveStreamFooter = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const { loading } = useSelector((state: RootState) => state.common);
    const { livestreams } = useSelector((state: RootState) => state.twitch);

    return (
        <div className={classes.root}>
            {livestreams.length > 0 && (
                <Button
                    className={classes.button}
                    variant="outlined"
                    color="default"
                    size={'small'}
                    disabled={loading}
                    startIcon={<SyncIcon />}
                    onClick={() => dispatch(getLiveStreams())}
                >
                    Refresh
                </Button>
            )}

            <Button
                component={Link}
                className={classes.button}
                variant="outlined"
                size={'small'}
                disabled={loading}
                startIcon={<SettingsIcon />}
                to="/settings"
            >
                Settings
            </Button>
        </div>
    );
};
