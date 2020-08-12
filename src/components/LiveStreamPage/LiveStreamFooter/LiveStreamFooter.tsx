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
            <div className="d-flex justify-content-center refresh-button-div">
                <button type="button" disabled={loading} className="btn btn-dark"
                        onClick={() => dispatch(getLiveStreams())}>
                    Check if anyone went live
                </button>
            </div>
        </div>
    )
};