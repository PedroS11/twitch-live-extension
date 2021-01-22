import { fetchToken } from '../identityFlowAuth/indetityFlowAuth';
import { getStorageData, setStorageData } from '../../utils/localStorage';
import { TOKEN_KEY } from '../../domain/store/twitchStore';
import { AxiosInstance } from 'axios';
import axios from 'axios';
import { axiosInterceptor } from '../axios/axiosInterceptor';
import { browser } from 'webextension-polyfill-ts';

export const getRefreshToken = async (): Promise<string> => {
    const { token } = await browser.runtime.sendMessage({ type: 'get-token', prompt: false });
    setStorageData(TOKEN_KEY, token);

    return token;
};

export const getToken = async (): Promise<string> => {
    try {
        const tokenStorage = getStorageData(TOKEN_KEY);

        if (!tokenStorage) {
            const { token } = await browser.runtime.sendMessage({ type: 'get-token', prompt: true });
            setStorageData(TOKEN_KEY, token);
            return token;
        }
        return tokenStorage;
    } catch (e) {
        console.log('ERR GET TOKEN', e);
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
