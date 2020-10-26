import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, CircularProgress, TextField} from "@material-ui/core";
// import {saveUsername} from "../store/reducers/twitchReducer";
import {makeStyles} from "@material-ui/core/styles";
import {RootState} from "../store/reducers/rootReducer";
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles(() => ({
    root: {
      marginLeft: 20,
      marginRight: 20
    },
    alignCenter: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
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

export const InputUsernamePage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const {loading} = useSelector((state: RootState) => state.common);

    const saveInput = async () => {
        // const success = await dispatch(saveUsername(username));
        // if (!success) {
        //     setErrorMsg(`Username ${username} doesn't exist`);
        // } else {
        //     setErrorMsg('')
        // }
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
            <div className={classes.alignCenter}>
                <TextField className={classes.inputUsername}
                    label="Enter your twitch username"
                    size={"small"}
                    disabled={loading}
                    fullWidth
                    onChange={e => validateInput(e.target.value)}
                    error={!!errorMsg}
                    helperText={errorMsg}
                />
            </div>

            {loading && (
                <div className={classes.alignCenter}>
                    <CircularProgress className={classes.loadingElem} size={30}/>
                </div>
            )}

            <div className={classes.alignCenter}>
                <Button
                    className={classes.button}
                    startIcon={<SaveIcon/>}
                    variant="outlined"
                    color="default"
                    size={"small"}
                    disabled={!username || loading}
                    onClick={() => saveInput()}>
                    Save username
                </Button>
            </div>
        </div>
    )
};