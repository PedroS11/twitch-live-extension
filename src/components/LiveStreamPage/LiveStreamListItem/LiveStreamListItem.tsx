import React from 'react'
import {TwitchLiveInfo} from "../../../infrastructure/twitch/twitchApi";
import {formatViewers} from "../../../utils/formatter";

import './LiveStreamListItem.css'

export const LiveStreamListItem = (elem: TwitchLiveInfo) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={elem.channel.url}>
            <div className="card stream-list-item">
                <div className="row no-gutters">
                    <div className="col-auto">
                        <img height={50} src={elem.channel.logo}/>
                    </div>
                    <div className="col">
                        <div className="card-block px-2">
                            <p className="stream-display-name card-title truncate ">{elem.channel.display_name}</p>
                            <p className="card-text truncate stream-game">{elem.game}</p>
                        </div>
                    </div>
                    <div className="col-auto align-self-center viewers">
                        {formatViewers(elem.viewers)}
                        <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-person viewer-logo"
                             fill="red"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </a>

        //
        // <div className="row">
        //     <div className="col-11 mt-3">
        //         <div className="card">
        //             <div className="card-horizontal">
        //                 <div className="img-square-wrapper">
        //                     <img height={50} src={elem.channel.logo}/>
        //                 </div>
        //                 <div className="card-body">
        //                     <h4 className="card-title">{elem.channel.display_name}</h4>
        //                     <div className="card-text">{elem.game}</div>
        //                 </div>
        //             </div>
        //
        //         </div>
        //     </div>

        // </div>


        //
        // <div>
        //
        // <a target="_blank" rel="noopener noreferrer" href={elem.channel.url}
        //    className="list-group-item list-group-item-action">
        //     <img height={50} src={elem.channel.logo}/>
        //     <div className="d-flex w-100 justify-content-between">
        //         {/*<div className="text-truncate logo">*/}
        //         {/*<img height={50} src={elem.channel.logo}/>*/}
        //         {/*</div>*/}
        //         <h5 className="mb-1">{elem.channel.display_name}</h5>
        //         <div>
        //             {elem.viewers}
        //             <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-person viewer-logo"
        //                  fill="red"
        //                  xmlns="http://www.w3.org/2000/svg">
        //                 <path fillRule="evenodd"
        //                       d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        //             </svg>
        //         </div>
        //     </div>
        //         <p className="mb-1">{elem.game}</p>
        // </a>
        // </div>
    )
};