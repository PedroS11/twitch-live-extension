import React from "react";
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";
import {removeStream} from "../../../store/reducers/twitchReducer";
import {useDispatch} from "react-redux";
import { green, purple } from '@material-ui/core/colors';
import {TwitchGetUserInfo, TwitchUserInfo} from "../../../domain/infrastructure/twitch/twitchApi";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#4c4c4c',
        height: 50,
        paddingRight: 63
    },
    deleteButton: {
        color: '#f65353',
        '&:hover': {
            backgroundColor: "rgba(246, 83, 83, 0.1)",
        },
    }
});

interface OptionsListItemProps {
  streamer: TwitchUserInfo
}

export const OptionsListItem = (props: OptionsListItemProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        <ListItem className={classes.root} divider dense>
            <ListItemAvatar>
                <Avatar src={props.streamer.logo}>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.streamer.display_name}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={async () => await dispatch(removeStream(props.streamer.name))} className={classes.deleteButton}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
};
