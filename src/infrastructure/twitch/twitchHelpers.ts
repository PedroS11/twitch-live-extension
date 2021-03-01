import { AxiosInstance } from 'axios';
import axios from 'axios';
import { axiosInterceptor } from '../axios/axiosInterceptor';
import { sendGetTokenMessage } from '../background/messageWrapper';
import * as localStorageService from '../localStorage/localStorageService';

export const getRefreshToken = async (): Promise<string> => {
    const token = await sendGetTokenMessage();
    localStorageService.storeToken(token);

    return token;
};

export const getToken = async (): Promise<string> => {
    try {
        const tokenStorage = localStorageService.getToken();

        if (!tokenStorage) {
            const token = await sendGetTokenMessage(true);
            localStorageService.storeToken(token);

            return token;
        }
        return tokenStorage;
    } catch (e) {
        console.error('Error getting token', e?.response?.data || e.message);
        throw e;
    }
};

export const createAxiosInstance = (clientId = ''): AxiosInstance => {
    return axiosInterceptor(
        axios.create({
            headers: {
                ...(clientId && { 'Client-Id': clientId }),
            },
        }),
    );
};
