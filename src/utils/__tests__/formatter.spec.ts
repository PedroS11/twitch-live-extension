import { formatViewers } from '../formatter';

describe('formatViewers', () => {
    it("should round the viewers number if it's higher or equal than 1000", () => {
        expect(formatViewers(1000)).toEqual('1k');
        expect(formatViewers(1001)).toEqual('1k');
        expect(formatViewers(1101)).toEqual('1.1k');
    });

    it("should just return the number of viewers if it's lower than 1000", () => {
        expect(formatViewers(900)).toEqual('900');
        expect(formatViewers(1)).toEqual('1');
        expect(formatViewers(0)).toEqual('0');
    });
});
