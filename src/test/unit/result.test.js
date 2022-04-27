// const fn = require('../../controllers/results.controller')

// jest.mock('../../models/result.model');
// const Results = require('../../models/result.model');

const mockFindAll = jest.fn();

const { getResults, count } = require('../../controllers/results.controller');
const Results = require('../../models/result.model');

jest.mock('../../models/result.model',
    () => jest.fn().mockImplementation(
        () => ({
            findAll: mockFindAll,
        }),
    ));


// jest.mock('../../models/result.model');
// fn.getResults().mockReturnValue({paged: 1, lang: "ko",  category:"unknown" , sortby: "abc@title.com",  order:"asc"});

describe('분석결과 관련 작업', () => {
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
    const next = jest.fn();

    test('분석결과를 가져온 뒤 res.status(200)을 응답합니다.', async () => {
        Results().findAll.mockReturnValue(Promise.resolve({
        // Results.prototype.findAll.mockReturnValue(Promise.resolve({
        // jest.spyOn(Results, 'findAll').mockReturnValue(Promise.resolve({
        //     getResults(paged,lang,category,sortby,order) {
            getResults(category,lang) {
                return Promise.resolve(true);
            }
        }));



        // Results.findAll = jest.fn().mockResolvedValue(Promise.resolve({
        //     getResults(paged,lang,category,sortby,order) {
        //         return Promise.resolve(true);
        //     }
        // }));
        // expect(Results.findAll).toHaveBeenCalledTimes(1);

        // Results.findAll = jest.fn().mockResolvedValue({
        //     data: {
        //         url: "https://www.abc.com",
        //         title: "test_title",
        //         language: "ko",
        //         category: "unknown",
        //     },
        // });

        // Results.findAll = jest.fn().mockImplementation(() => {
        //     return {
        //         url: "https://www.abc.com",
        //                 title: "test_title",
        //                 language: "ko",
        //                 category: "unknown"
        //     }
        // })

        await getResults(req, res);
        expect(res.status).toBeCalledWith(200);
    });

    test('분석결과를 가져오지 못했다면, res.status(500)을 응답합니다.', async () => {
        const error = '테스트용 에러';
        Results().findAll.mockReturnValue(Promise.reject(error));
        await getResults(req, res);
        expect(res.status).toBeCalledWith(500);
        // expect(next).toBeCalledWith(error);
    });

    // test('분석결과를 가져오지 못했다면, res.status(500)을 응답합니다.', async () => {
    //     // Results.prototype.findAll.mockReturnValue(null);
    //     Results().findAll.mockResolvedValue(null);
    //     // jest.spyOn(Results, 'findAll').mockReturnValue(null);
    //
    //     await getResults(req, res);
    //     expect(res.status).toBeCalledWith(500);
    //     // expect(res.send).toBeCalledWith('no user');
    // });

});