import React from 'react';

import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatViewers } from '../../../../utils/formatter';
import { FollowedLivestream } from '../../../../domain/infrastructure/twitch/twitch';
import { ViewerIcon } from '../../../../components/SVG/viewerIcon';
import { PopperTitle } from './PopperTitle';

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
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <ListItem
                className={classes.root}
                button
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={elem.url}
                divider
                dense
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <ListItemAvatar>
                    <Avatar src={elem.profile_image_url} />
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
                        <Typography
                            noWrap
                            variant={'subtitle1'}
                            color={'textSecondary'}
                            className={classes.viewersText}
                        >
                            {formatViewers(elem.viewer_count)}
                        </Typography>
                        <ViewerIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <PopperTitle title={elem.title} anchorEl={anchorEl} open={open} />
        </>
    );
};
