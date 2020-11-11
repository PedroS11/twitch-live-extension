import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 8,
    },
    button: {
        textTransform: 'none',
    },
});

export const SettingsFooter = () => {
    const classes = useStyles();

    const { loading } = useSelector((state: RootState) => state.common);

    return (
        <div className={classes.root}>
            <Button
                component={Link}
                className={classes.button}
                variant="outlined"
                size={'small'}
                disabled={loading}
                startIcon={<ArrowBackIcon />}
                to="/"
            >
                Back
            </Button>
        </div>
    );
};
