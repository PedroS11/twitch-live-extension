import React from "react";
import {List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {OptionsListItem} from "../OptionsListItem/OptionsListItem";
import {TwitchUserInfo} from "../../../domain/infrastructure/twitch/twitchApi";

interface OptionsListProps {
    streamers: TwitchUserInfo[]
}

const useStyles = makeStyles({
    root: {
        paddingTop: 5,
        paddingBottom: 5
    },
    list: {
        overflow: 'auto',
        maxHeight: 400,
        paddingTop: 0,
        paddingBottom: 0,
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
        <div className={classes.root}>
            <List className={classes.list}>
                {streamers.map(streamer =>
                    <OptionsListItem streamer={streamer} key={streamer._id}/>
                )}
                <div id={"scroll-bottom"}/>
            </List>
        </div>
    )
};
