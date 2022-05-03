const request = require('supertest');
const should = require('should'); // 노드의 기본 검증 모듈
const app = require('../../server');
const models = require('../../models/result.model');

describe('GET api/results는', () => {
    describe('성공시', () => {
        it('...', (done) => {
            request(app)
                .get('/api/results')
                .end((err, res) => {
                    ///
                    done();
                });
        });
    });
    describe('실패시', () => {
        it('...', (done) => {
            request(app)
                .get('/api/results')
                .end((err, res) => {
                    ///
                    done();
                });
        });
    });
});