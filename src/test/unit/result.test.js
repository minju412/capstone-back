const mockFindAll = jest.fn();

const { getResults, count } = require('../../controllers/results.controller');
const Results = require('../../models/result.model');

jest.mock('../../models/result.model',
    () => jest.fn().mockImplementation(
        () => ({
            findAll: mockFindAll,
        }),
    ));

describe('분석결과를 가져오는 작업', () => {
    const req = {
        // result : { category:"unknown", lang: "ko" },
        // query: { paged: 1, sortby: "title",  order:"asc" },
        query: { paged: 1, category:"unknown", lang: "ko", sortby: "title",  order:"asc" },
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
        // data: { url: "https://www.abc.com", title: "test_title", language: "ko", category: "unknown" },
    };
    // const next = jest.fn();

    test.skip('분석결과를 가져온 뒤 res.status(200)을 응답합니다.', async () => {
        Results().findAll.mockReturnValue(Promise.resolve({
            getResults(category,lang) {
                return Promise.resolve(true);
            }
        }));

        await getResults(req, res);
        expect(res.status).toBeCalledWith(200);
    });

    test.skip('분석결과를 가져오지 못했다면, res.status(500)을 응답합니다.', async () => {
        const error = '테스트용 에러';
        Results().findAll.mockReturnValue(Promise.reject(error));
        await getResults(req, res);
        expect(res.status).toBeCalledWith(500);
        // expect(next).toBeCalledWith(error);
    });
});

describe('분석 결과를 카운트하는 작업', () => {
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };

    test.skip('분석 결과를 카테고리 별로 카운트합니다.', () => {

    });
});