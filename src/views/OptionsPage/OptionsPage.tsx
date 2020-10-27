import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {OptionsList} from "./OptionsList/OptionsList";
import {OptionsFooter} from "./OptionsFooter/OptionsFooter";
import {OptionsInputStream} from "./OptionsInputStream/OptionsInputStream";
import {useDispatch, useSelector} from "react-redux";
import {loadFavorites} from "../../store/reducers/twitchReducer";
import {RootState} from "../../store/reducers/rootReducer";

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
    const dispatch = useDispatch();

    const {favoriteStreamers} = useSelector((state:RootState) => state.twitch);

    useEffect(() => {
        dispatch(loadFavorites())
    }, []);

    return (
        <div>
            <OptionsList streams={favoriteStreamers}/>
            <OptionsInputStream/>
            <OptionsFooter/>
        </div>
    )
};
