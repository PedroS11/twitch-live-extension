import { AxiosStatic } from 'axios';

const mockAxios: AxiosStatic = jest.genMockFromModule('axios');
// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
