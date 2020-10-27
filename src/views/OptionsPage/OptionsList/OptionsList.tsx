import React from "react";
import {Link} from "react-router-dom";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {OptionsListItem} from "../OptionsListItem/OptionsListItem";

interface OptionsListProps {
    streams: string[]
}

const useStyles = makeStyles({
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
export const OptionsList = ({streams}: OptionsListProps) => {
    const classes = useStyles();

    return (
        <div>
            <List className={classes.list}>
                {streams.map(stream =>
                    <OptionsListItem name={stream} key={stream} />
                )}
            </List>
        </div>
    )
};
