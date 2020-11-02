import React from "react";
import {Link} from "react-router-dom";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {OptionsListItem} from "../OptionsListItem/OptionsListItem";
import {TwitchGetUserInfo, TwitchUserInfo} from "../../../domain/infrastructure/twitch/twitchApi";

interface OptionsListProps {
    streamers: TwitchUserInfo[]
}

const useStyles = makeStyles({
    list: {
        overflow: 'auto',
        maxHeight: 400,
        '&::-webkit-scrollbar': {
            width: '0.6em'
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: 10
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
            borderRadius: 10
        }
    }
});
export const OptionsList = ({streamers}: OptionsListProps) => {
    const classes = useStyles();

    return (
        <div>
            <List className={classes.list}>
                {streamers.map(streamer =>
                    <OptionsListItem streamer={streamer} key={streamer._id} />
                )}
            </List>
        </div>
    )
};
