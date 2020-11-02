import React, {useEffect} from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {OptionsList} from "./OptionsList/OptionsList";
import {OptionsFooter} from "./OptionsFooter/OptionsFooter";
import {OptionsInputStream} from "./OptionsInputStream/OptionsInputStream";
import {useDispatch, useSelector} from "react-redux";
import {loadFavorites} from "../../store/reducers/twitchReducer";
import {RootState} from "../../store/reducers/rootReducer";

const useStyles = makeStyles({
    list: {
        // marginTop: 5,
        marginBottom: 5
    }
});
export const OptionsPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {favoriteStreamers} = useSelector((state: RootState) => state.twitch);

    useEffect(() => {
        dispatch(loadFavorites())
    }, [dispatch]);

    return (
        <div>
            {favoriteStreamers.length > 0 && <OptionsList streamers={favoriteStreamers}/>}
            {favoriteStreamers.length === 0 && <div className={classes.list}>
                <Typography align={"center"} variant={'subtitle2'} style={{fontStyle: 'italic'}}>Your favorite
                    streamers' list is empty</Typography>
            </div>}
            <OptionsInputStream/>
            <OptionsFooter/>
        </div>
    )
};
