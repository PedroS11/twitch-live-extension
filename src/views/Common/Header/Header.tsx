import React from 'react';

import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginBottom: 5,
    },
    title: {
        color: '#FFF',
        '&:hover': {
            color: '#aaaaaa',
        },
    },
});

export const Header = () => {
    const classes = useStyles();

    return (
        <Typography variant={'h4'} align={'center'} className={classes.root}>
            <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitch.tv"
                underline={'none'}
                className={classes.title}
            >
                Twitch Live
            </Link>
        </Typography>
    );
};
