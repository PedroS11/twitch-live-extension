import React from "react";
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#4c4c4c',
        height: 50,
        paddingRight: 63
    }
});

interface OptionsListItemProps {
  name: string
}

export const OptionsListItem = (props: OptionsListItemProps) => {
    const classes = useStyles();

    return(
        <ListItem className={classes.root} divider>
            <ListItemText
                primary={props.name}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
};
