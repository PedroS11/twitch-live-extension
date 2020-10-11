import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getLiveStreams} from '../../../store/reducers/twitchReducer';
import {RootState} from "../../../store/reducers/rootReducer";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import SyncIcon from '@material-ui/icons/Sync';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 8
    },
    button: {
        textTransform: 'none'
    }
});

export const LiveStreamFooter = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {loading} = useSelector((state: RootState) => state.common);

    return (
        <div className={classes.root}>
            <Button
                className={classes.button}
                variant="outlined"
                color="default"
                size={"small"}
                disabled={loading}
                startIcon={<SyncIcon />}
                onClick={() => dispatch(getLiveStreams())}>
                Refresh list
            </Button>
        </div>
    )
};