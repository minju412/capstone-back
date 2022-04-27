// const fn = require('../../controllers/auth.controller');

// jest.mock('../../controllers/auth.controller');
// fn.signup.mockReturnValue({name:"Ann"});

// test('유저를 만든다.',()=>{
//     const user = fn.signup("Ann");
//     expect(user.name).toBe("Ann");
// });

// jest.mock('../../models/user.model');
// const User = require('../../models/user.model');




const { signup, signin } = require('../../controllers/auth.controller');
// const fn = require('../../controllers/auth.controller');

// jest.mock('../../controllers/auth.controller');
// fn.signup.mockReturnValue({userName: "ann", userEmail: "abc@naver.com",  userPw:"1234"});

describe('회원가입 관련 작업', () => {
    const req = {
        // body: { userName: "ann", userEmail: "abc@naver.com",  userPw:"1234" },
        user: { id: 1, userName: "ann", userEmail: "abc@naver.com",  userPw:"1234" },
        // params: { id: 2 }
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();

    test.skip('회원가입 후 ok를 응답합니다.', async () => {
        await signup(req, res);
        expect(res.status).toBeCalledWith(201);
        // expect(res.send).toBeCalledWith('ok');
    });

    test.skip('회원가입 실패시, res.status(500).send(\'Could not sign up.\')를 호출합니다.', async () => {
        await signup(req, res);
        expect(res.status).toBeCalledWith(500);
        // expect(res.send).toBeCalledWith('Could not sign up.');
    });
});




// test('DB에서 에러 발생 시 next(error) 호출', async () => {
//     const error = '테스트용 에러';
//     await signup(req, res);
//     expect(next).toBeCalledWith(error);
// });