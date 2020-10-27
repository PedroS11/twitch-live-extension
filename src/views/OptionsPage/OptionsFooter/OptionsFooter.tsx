import {getLiveStreams} from "../../../store/reducers/twitchReducer";
import {Button} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 8
    },
    button: {
        textTransform: 'none'
    }
});

export const OptionsFooter = () => {
    const classes = useStyles();

    const {loading} = useSelector((state: RootState) => state.common);

    return (
    <div className={classes.root}>
        <Button
            component={Link}
            className={classes.button}
            variant="outlined"
            size={"small"}
            disabled={loading}
            startIcon={<HomeIcon />}
            to="/">
            Home
        </Button>
    </div>
  );
};