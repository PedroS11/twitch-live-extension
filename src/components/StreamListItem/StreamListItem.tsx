import React from 'react'
import './StreamListItem.css'
import {TwitchLiveInfo} from "../../infrastructure/twitch/twitchApi";

export const StreamListItem = (elem: TwitchLiveInfo) => {
    return (
        <div>
            <a target="_blank" rel="noopener noreferrer" href={elem.channel.url} >
                <div className="row align-items-center" key={elem._id}
                     style={{background: "white", color: "rgb(19 17 17)"}}>
                    <div className="text-truncate" style={{paddingLeft: 15, paddingRight: 5}}>
                        <img height={50} src={elem.channel.logo}/>
                    </div>
                    <div className="text-truncate" style={{width: 205}}>
                        <div>
                            {elem.channel.display_name}
                        </div>
                        <div style={{fontSize: 12}}>
                            {elem.game}
                            {elem.game}
                            {elem.game}
                            {elem.game}
                            {elem.game}
                        </div>
                    </div>
                    <div className="ml-auto" style={{paddingRight: 20}}>
                        {elem.viewers}
                    </div>
                </div>
            </a>
        </div>
    )
};