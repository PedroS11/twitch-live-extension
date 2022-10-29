import { AxiosInstance } from 'axios';
import axios from 'axios';
import { axiosInterceptor } from '../axios/axiosInterceptor';
import { sendGetTokenMessage } from '../background/messageWrapper';
import * as localStorageService from '../localStorage/localStorageService';

export const getRefreshToken = async (promptPopup = false): Promise<string> => {
    await sendGetTokenMessage(promptPopup);

    return localStorageService.getToken();
};

export const getToken = async (): Promise<string> => {
    try {
        const tokenStorage = localStorageService.getToken();

        if (!tokenStorage) {
            await sendGetTokenMessage(true);

            return localStorageService.getToken();
        }
        return tokenStorage;
    } catch (e) {
        console.error('Error getting token', e?.response?.data || e.message);
        throw e;
    }
};

export const createAxiosInstance = (clientId = ''): AxiosInstance =>
    axiosInterceptor(
        axios.create({
            headers: {
                ...(clientId && { 'Client-Id': clientId }),
            },
        }),
    );
