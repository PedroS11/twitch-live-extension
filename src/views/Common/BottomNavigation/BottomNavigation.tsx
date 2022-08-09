import React from 'react';
import {
    BottomNavigation as MaterialBottomNavigation,
    BottomNavigationAction,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    nav: {
        '& .Mui-selected, .Mui-selected > svg': {
            color: 'rgb(190,154,252)',
        },
        height: 50,
    },
});
export const BottomNavigation = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <MaterialBottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            className={classes.nav}
        >
            <BottomNavigationAction
                label="Favorites"
                component={Link}
                to="/"
                icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
                label="Explore"
                component={Link}
                to="/explore"
                icon={<ExploreIcon />}
            />
            <BottomNavigationAction
                label="Settings"
                component={Link}
                to="/settings"
                icon={<SettingsIcon />}
            />
        </MaterialBottomNavigation>
    );
};
