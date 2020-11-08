import { fetchToken } from '../identityFlowAuth/indetityFlowAuth';
import { getStorageData, setStorageData } from '../../utils/localStorage';
import { TOKEN_KEY } from '../../domain/store/twitchStore';
import { AxiosInstance } from 'axios';
import axios from 'axios';

export const refreshToken = async (): Promise<string> => {
    const token = await fetchToken();
    setStorageData(TOKEN_KEY, token);

    return token;
};

export const getToken = async (): Promise<string> => {
    const tokenStorage = getStorageData(TOKEN_KEY);
    if (!tokenStorage) {
        const token: string = await fetchToken(true);
        setStorageData(TOKEN_KEY, token);
        return token;
    }
    return tokenStorage;
};

export const createAxiosInstance = (token: string, clientId = ''): AxiosInstance => {
    return axios.create({
        headers: {
            ...(clientId && { 'Client-Id': clientId }),
            Authorization: `Bearer ${token}`,
        },
    });
};
