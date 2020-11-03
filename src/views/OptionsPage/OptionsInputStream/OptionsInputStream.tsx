import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, IconButton, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import {RootState} from "../../../store/reducers/rootReducer";
import {saveFavoriteStream} from "../../../store/reducers/twitchReducer";
import {AppDispatch} from "../../../store/store";
import {CenteredCircularProgress} from "../../../components/Progress/CenteredCircularProgress";
import {SaveFavoriteStreamResponse} from "../../../domain/infrastructure/twitch/twitchApi";

const useStyles = makeStyles(() => ({
    root: {
        marginLeft: 20,
        marginRight: 20,
    },
    addButton: {
        marginTop: 10,
        textTransform: 'none',
        color: '#03cf01',
        '&:hover': {
            backgroundColor: "rgba(3, 207, 1, 0.1)",
        },
    },
    loadingElem: {
        color: '#FFFFFF'
    },
    inputUsername: {
        '& label.Mui-focused': {
            color: 'rgb(228 225 225 / 70%)',
        },
        '& label.Mui-error': {
            color: 'rgb(228 225 225 / 70%)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(228 225 225 / 70%)',
        },
    }
}));

export const OptionsInputStream = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const {loading} = useSelector((state: RootState) => state.common);

    const saveInput = async () => {
        const status: SaveFavoriteStreamResponse = await dispatch(saveFavoriteStream(username));
        if (!status.success) {
            setErrorMsg(status.message ?? '');
        } else {
            setErrorMsg('');
            setUsername('');

            // @ts-ignore
            const scroll = document.getElementById('scroll-bottom');
            scroll!.scrollIntoView({block: 'end', behavior: 'smooth'});
        }
    };

    const validateInput = () => {
        if (!username || username.length > 2) {
            setErrorMsg('');
        } else {
            setErrorMsg('Invalid username, must longer than 2 characters');
        }
    };

    useEffect(() => {
        const delayTimeOutFunction = setTimeout(() => {
            validateInput()
        }, 500);
        return () => clearTimeout(delayTimeOutFunction);
    }, [username]);

    return (
        <div className={classes.root}>
            {loading && <CenteredCircularProgress/>}

            <Grid container
                  direction="row"
                  justify="space-between"
                  alignItems="center">
                <Grid item xs={10}>
                    <TextField className={classes.inputUsername}
                               label="Twitch username"
                               size={"small"}
                               disabled={loading}
                               fullWidth
                               value={username}
                               onChange={e => setUsername(e.target.value)}
                               error={!!errorMsg}
                               helperText={errorMsg}
                    />
                </Grid>

                <Grid item>
                    <IconButton
                        edge="end"
                        aria-label="add"
                        disabled={!(username && username.length > 2) || loading}
                        onClick={() => saveInput()} className={classes.addButton}>
                        <AddIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
};