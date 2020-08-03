import React from 'react';
import './App.css';
import {LiveStreamList} from "./components/LiveStreamPage/LiveStreamList/LiveStreamList";
import {Header} from "./components/Common/Header/Header";
import {RootState} from "./store/reducers/rootReducer";
import {useSelector} from "react-redux";
import {LiveStreamPage} from "./components/LiveStreamPage/LiveStreamPage";
import {SettingsPage} from "./components/SettingsPage/SettingsPage";

function App() {
    const {page} = useSelector((state: RootState) => state.common)
    return (
        <div className="container">
            <Header/>
            {page==='SETTINGS'
                ? <SettingsPage/>
                : <LiveStreamPage/>}
        </div>
    );
}

export default App;
