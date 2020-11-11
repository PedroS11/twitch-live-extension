import { fetchToken } from '../identityFlowAuth/indetityFlowAuth';
import { getStorageData, setStorageData } from '../../utils/localStorage';
import { TOKEN_KEY } from '../../domain/store/twitchStore';
import { AxiosInstance } from 'axios';
import axios from 'axios';
import { axiosInterceptor } from '../axios/axiosInterceptor';

export const getRefreshToken = async (): Promise<string> => {
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

export const createAxiosInstance = (clientId = ''): AxiosInstance => {
    return axiosInterceptor(
        axios.create({
            headers: {
                ...(clientId && { 'Client-Id': clientId }),
            },
        }),
    );
};
