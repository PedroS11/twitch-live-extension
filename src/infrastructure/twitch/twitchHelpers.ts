import { fetchToken } from '../identityFlowAuth/indetityFlowAuth';
import { getStorageData, setStorageData } from '../../utils/localStorage';
import { AxiosInstance } from 'axios';
import axios from 'axios';
import { axiosInterceptor } from '../axios/axiosInterceptor';
import { sendGetTokenMessage } from '../background/messageWrapper';
import { TOKEN_KEY } from '../../domain/utils/contants';

export const getRefreshToken = async (): Promise<string> => {
    const token = await sendGetTokenMessage();
    setStorageData(TOKEN_KEY, token);

    return token;
};

export const getToken = async (): Promise<string> => {
    try {
        const tokenStorage = getStorageData(TOKEN_KEY);

        if (!tokenStorage) {
            const token = await sendGetTokenMessage(true);
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
