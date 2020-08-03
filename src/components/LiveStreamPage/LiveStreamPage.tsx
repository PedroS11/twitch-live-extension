import {LiveStreamFooter} from "./LiveStreamFooter/LiveStreamFooter";
import React from "react";
import {LiveStreamList} from "./LiveStreamList/LiveStreamList";

export const LiveStreamPage = () => {
    return (
        <div>
            <LiveStreamList/>
            <LiveStreamFooter/>
        </div>
    )
};