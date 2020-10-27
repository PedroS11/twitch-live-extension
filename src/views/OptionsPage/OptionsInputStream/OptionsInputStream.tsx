import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, CircularProgress, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import {RootState} from "../../../store/reducers/rootReducer";
import {saveFavoriteStream} from "../../../store/reducers/twitchReducer";
import {AppDispatch} from "../../../store/store";

const useStyles = makeStyles(() => ({
    root: {
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
    alignCenter: {
    },
    button: {
        margin: 10,
        textTransform: 'none'
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
        const status = await dispatch(saveFavoriteStream(username));
        if (!status.success) {
            setErrorMsg(status.message);
        } else {
            setErrorMsg('')
            setUsername('')
        }
    };

    const validateInput = (username: string) => {
        if (username && username.length > 2) {
            setUsername(username);
            setErrorMsg('');
        } else {
            setErrorMsg('Invalid username');
            setUsername('');

        }
    };

    return (
        <div className={classes.root}>
            {loading && <CircularProgress/>}

            <div className={classes.alignCenter}>
                <TextField className={classes.inputUsername}
                           label="Twitch username"
                           size={"small"}
                           disabled={loading}
                           fullWidth
                           onChange={e => validateInput(e.target.value)}
                           error={!!errorMsg}
                           helperText={errorMsg}
                />
            </div>

            <Button
                className={classes.button}
                startIcon={<AddIcon/>}
                variant="outlined"
                color="default"
                size={"small"}
                disabled={!username || loading}
                onClick={() => saveInput()}>
                Add
            </Button>
        </div>
    )
};