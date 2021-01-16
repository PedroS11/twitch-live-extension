import React from 'react';

import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatViewers } from '../../../../utils/formatter';
import { FollowedLivestream } from '../../../../domain/infrastructure/twitch/twitch';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#4c4c4c',
        height: 50,
        paddingRight: 63,
    },
    gameText: {
        fontSize: 11,
    },
    viewersText: {
        fontSize: 13,
        paddingRight: 3,
    },
});

export const LiveStreamListItem = (elem: FollowedLivestream) => {
    const classes = useStyles();

    return (
        <ListItem
            className={classes.root}
            button
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href={elem.url}
            divider
            dense
        >
            <ListItemAvatar>
                <Avatar src={elem.profile_image_url}></Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={elem.display_name}
                secondary={
                    <Typography className={classes.gameText} noWrap variant={'subtitle2'} color={'textSecondary'}>
                        {elem.game}
                    </Typography>
                }
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" disabled size={'small'}>
                    <Typography noWrap variant={'subtitle1'} color={'textSecondary'} className={classes.viewersText}>
                        {formatViewers(elem.viewer_count)}
                    </Typography>
                    <svg
                        width="0.9em"
                        height="0.9em"
                        viewBox="0 0 16 16"
                        className="bi bi-person viewer-logo"
                        fill="red"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                        />
                    </svg>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
