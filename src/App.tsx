/*global chrome*/
import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/Common/Header/Header";
import {useDispatch} from "react-redux";
import {LiveStreamPage} from "./components/LiveStreamPage/LiveStreamPage";
import {getLiveStreams} from "./store/reducers/twitchReducer";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLiveStreams());
    }, []);

    return (
        <div className="container">
            <Header/>
            <LiveStreamPage/>
        </div>
    );
}

export default App;
