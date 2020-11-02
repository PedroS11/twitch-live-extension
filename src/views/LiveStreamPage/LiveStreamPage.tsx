import {LiveStreamFooter} from "./LiveStreamFooter/LiveStreamFooter";
import React, {useEffect} from "react";
import {LiveStreamList} from "./LiveStreamList/LiveStreamList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getLiveStreams} from "../../store/reducers/twitchReducer";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CenteredCircularProgress} from "../../components/Progress/CenteredCircularProgress";

const useStyles = makeStyles({
    root: {
    },
    loadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    loadingElem: {
        color: '#FFFFFF'
    }
});

export const LiveStreamPage = () => {
    const {loading} = useSelector((state: RootState) => state.common);
    const {liveStreams, favoriteStreamers} = useSelector((state:RootState) => state.twitch);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLiveStreams());
        // dispatch(loadFavorites())
    }, []);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {!loading && favoriteStreamers.length === 0 && <Typography align={"center"} variant={'subtitle2'} style={{fontStyle: 'italic'}}>Go to Options and add your streamers</Typography>}
            {!loading && favoriteStreamers.length > 0 && liveStreams.length === 0 && <Typography align={"center"}>Your favorite channels are all offline...</Typography>}
            {!loading && favoriteStreamers.length > 0 && <LiveStreamList liveStreams={liveStreams}/>}
            {loading && <CenteredCircularProgress/>}
            <LiveStreamFooter/>
        </div>
    )
};