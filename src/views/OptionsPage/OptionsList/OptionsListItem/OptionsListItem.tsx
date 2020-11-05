import React from 'react';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { removeStream } from '../../../../store/reducers/twitchReducer';
import { TwitchUserInfo } from '../../../../domain/infrastructure/twitch/twitchApi';
import { AppDispatch } from '../../../../store/store';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#4c4c4c',
        height: 50,
        paddingRight: 63,
    },
    deleteButton: {
        color: '#f65353',
        '&:hover': {
            backgroundColor: 'rgba(246, 83, 83, 0.1)',
        },
    },
});

interface OptionsListItemProps {
    streamer: TwitchUserInfo;
}

export const OptionsListItem = ({ streamer }: OptionsListItemProps) => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    return (
        <ListItem className={classes.root} divider dense>
            <ListItemAvatar>
                <Avatar src={streamer.logo}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={streamer.display_name} />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={async () => await dispatch(removeStream(streamer.name))}
                    className={classes.deleteButton}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
