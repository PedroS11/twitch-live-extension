import React from 'react'

import './Header.css';
import {Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    title: {
        color: '#a96fff',
        '&:hover': {
            color: '#590d92'
        }
    }
});

export const Header = () => {
    const classes = useStyles();
    return (
        <Typography variant={"h4"} align={"center"}>
            <Link target="_blank" rel="noopener noreferrer" href="https://twitch.tv" underline={"none"} className={classes.title}>Twitch Live</Link>
        </Typography>
    )
};