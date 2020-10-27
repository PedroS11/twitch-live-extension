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
import {Link} from "react-router-dom";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getLiveStreams());
    }, []);

    return (
        <div>
            <LiveStreamPage/>
        </div>
    );
}

export default App;
