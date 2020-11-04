import mockAxios from 'axios';
import {
    TwitchGetLiveInfo,
    TwitchGetUserInfo,
    TwitchLiveInfo,
    TwitchUserInfo,
} from '../../../domain/infrastructure/twitch/twitchApi';
import { getTwitchLiveInfo, getTwitchUserInfo } from '../twitchApi';

jest.mock('../__mocks__/axios');

describe('twitchApi', () => {
    const username = 'randomusername';
    const id = '39598259580';

    describe('getTwitchUserInfo', () => {
        it('should get user information from twitch API', async () => {
            const response: TwitchGetUserInfo = {
                _total: 1,
                users: [
                    {
                        display_name: username.toUpperCase(),
                        _id: '490774600',
                        name: username,
                        type: 'user',
                        created_at: '2020-02-07T00:59:45.588254Z',
                        updated_at: '2020-10-27T21:39:03.987778Z',
                        logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/profile_image-300x300.png',
                    },
                ],
            };

            // @ts-ignore
            mockAxios.get.mockResolvedValue({ data: response });

            const result: TwitchUserInfo = await getTwitchUserInfo(username);
            expect(result).toEqual(response.users[0]);
        });

        it("should return undefined if the user doesn't exist", async () => {
            const response: TwitchGetUserInfo = {
                _total: 0,
                users: [],
            };

            // @ts-ignore
            mockAxios.get.mockResolvedValue({ data: response });

            const result: TwitchUserInfo = await getTwitchUserInfo(username);
            expect(result).toBeUndefined;
        });
    });

    describe('getTwitchLiveInfo', () => {
        it('should return the livestream inforamtion if the streamer is live', async () => {
            const response: TwitchGetLiveInfo = {
                streams: [
                    {
                        _id: 39598259580,
                        game: 'Resident Evil 2',
                        viewers: 40,
                        channel: {
                            display_name: '2guys2random',
                            name: '2guys2random',
                            logo:
                                'https://static-cdn.jtvnw.net/jtv_user_pictures/755691a2-9476-48a8-a70a-8405118fd607-profile_image-300x300.png',
                            url: 'https://www.twitch.tv/2guys2random',
                        },
                    },
                ],
            };

            // @ts-ignore
            mockAxios.get.mockResolvedValue({ data: response });

            const result: TwitchLiveInfo = await getTwitchLiveInfo(id);
            expect(result).toEqual(response.streams[0]);
        });

        it("should return undefined if the streamer isn't live", async () => {
            const response: TwitchGetLiveInfo = {
                streams: [],
            };

            // @ts-ignore
            mockAxios.get.mockResolvedValue({ data: response });

            const result: TwitchLiveInfo = await getTwitchLiveInfo(id);
            expect(result).toBeUndefined;
        });
    });
});
