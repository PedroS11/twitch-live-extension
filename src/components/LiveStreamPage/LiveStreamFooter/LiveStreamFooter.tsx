import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getLiveStreams} from '../../../store/reducers/twitchReducer';
import {RootState} from "../../../store/reducers/rootReducer";

import './LiveStreamFooter.css';

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
            </div>
        </div>
    )
};