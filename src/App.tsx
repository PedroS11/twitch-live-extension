import React, {useEffect} from 'react';
import './App.css';
// import {useDispatch} from "react-redux";
import {LiveStreamPage} from "./views/LiveStreamPage/LiveStreamPage";

function App() {
    // const dispatch = useDispatch();

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
