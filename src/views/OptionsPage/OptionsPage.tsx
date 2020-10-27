import React from "react";
import {Link} from "react-router-dom";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {OptionsList} from "./OptionsList/OptionsList";
import {OptionsFooter} from "./OptionsFooter/OptionsFooter";
import {OptionsInputStream} from "./OptionsInputStream/OptionsInputStream";

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
export const OptionsPage = () => {
    const classes = useStyles();

    const streams = ['a','b','c','aa'];
    return (
        <div>
            <OptionsList streams={streams}/>
            <OptionsInputStream/>
            <OptionsFooter/>
        </div>
    )
};
