const mockFindOne = jest.fn();
const mockCreate = jest.fn();

const { signup, signin } = require('../../api/auth/auth.controller');
const Users = require('../../models/user.model');
const httpMocks = require('node-mocks-http');
const newUser = require('../data/user.json');

jest.mock('../../models/user.model',
    () => jest.fn().mockImplementation(
        () => ({
            findOne: mockFindOne,
            create: mockCreate,
        }),
    ));

// fn.signup.mockReturnValue({userName: "ann", userEmail: "abc@naver.com",  userPw:"1234"});

// test('[DB 데이터 조회 테스트] 사용자 id를 통해 password 조회 테스트', async () => {
//     const req = httpMocks.createRequest({
//         method: 'GET',
//         url: '/api/test?id=user@test.com',
//     });
//     const res = httpMocks.createResponse();
//     const next = null;
//     const expectedResult = { password: 'mypass123' };
//     const mockFindPasswordById = jest.spyOn(Users, 'findPasswordById');
//     mockFindPasswordById.mockResolvedValue(expectedResult);
//     await UserController.getPassword(req, res, next);
//     expect(res.statusCode).toBe(200);
//     expect(res._getJSONData()).toStrictEqual(expectedResult);
// });

//beforeEach
// let req, res, next;
// beforeEach(() => {
//     req = httpMocks.createRequest({
//         method: 'POST',
//         url: '/auth/signup',
//         body: { userName: "ann", userEmail: "abc@naver.com",  userPw:"1234" },
//     });
//     res = httpMocks.createResponse();
//     // next = null;
// });

describe('회원가입 관련 작업', () => {
    // beforeEach(() => {
    //     // Mock 데이터 넣어주기
    //     req.body = newUser;
    // });

    const req = httpMocks.createRequest({
        method: 'POST',
        url: '/auth/signup',
        body: newUser,
        // body: { userName: "ann", userEmail: "abc@naver.com",  userPw:"1234" },
    });
    const res = httpMocks.createResponse();
    // req.body = newUser;


    test.skip('이미 가입되어있다면 회원가입에 실패합니다.', async () => {
        Users().findOne.mockReturnValue(Promise.resolve({
            signup(userEmail) {
                return Promise.resolve(true);
            }
        }));

        await signup(req, res);
        expect(res.statusCode).toBe(403);
    });

    test('처음 가입하는 회원이라면 회원가입에 성공합니다.', async () => {
        Users().create.mockReturnValue(Promise.resolve({
            signup(UserName,userEmail,userPw) {
                return Promise.resolve(true);
            }
        }));

        await signup(req, res);
        expect(res.statusCode).toBe(201);
        // expect(Users.create).toBeCalledWith(newUser);
    });

    test.skip('회원가입 실패시, res.status(500)을 응답합니다.', async () => {
        const error = '테스트용 에러';
        Users().findOne.mockReturnValue(Promise.reject(error));
        await signup(req, res);
        expect(res.statusCode).toBe(500);
    });

});