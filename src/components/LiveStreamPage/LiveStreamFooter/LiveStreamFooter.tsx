import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getLiveStreams} from '../../../store/reducers/twitchReducer';
import {goToSettings} from '../../../store/reducers/commonReducer';
import {RootState} from "../../../store/reducers/rootReducer";

import './LiveStreamFooter.css';
import {SettingsIcon} from "@primer/octicons-react";

export const LiveStreamFooter = () => {
    const dispatch = useDispatch();

    const {loading} = useSelector((state: RootState) => state.common);

    return (
        <div>
            <div className="d-flex justify-content-center" style={{paddingTop: 4}}>
                <button type="button" disabled={loading} id="refresh-button" className="btn btn-primary"
                        onClick={() => dispatch(getLiveStreams())}>
                    Check if anyone goes live
                </button>

                <button type="button"  id="options-button" className="btn btn-primary"
                        onClick={() => dispatch(goToSettings())}>
                    <SettingsIcon size={20} />
                </button>
            </div>
        </div>
    )
};