/*global chrome*/
import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./views/Common/Header/Header";
import {useDispatch} from "react-redux";
import {LiveStreamPage} from "./views/LiveStreamPage/LiveStreamPage";
import {getLiveStreams} from "./store/reducers/twitchReducer";
import {ThemeProvider} from '@material-ui/core/styles';
import darkTheme from './themes/darkTheme';
import {Paper} from "@material-ui/core";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLiveStreams());
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <Paper square>
                <Header/>
                <LiveStreamPage/>
            </Paper>
        </ThemeProvider>
    );
}

export default App;
