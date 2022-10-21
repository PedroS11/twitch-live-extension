import { MESSAGE_TYPES } from './constants';

export interface BackgroundMessage {
    type: MESSAGE_TYPES;
    data: any;
}
