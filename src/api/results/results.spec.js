const request = require('supertest');
const should = require('should'); // 노드의 기본 검증 모듈
const app = require('../../server');

const models = require('../../models/index');
const newResults = require('./results.data.json');

describe('GET api/results는', () => {
    before(() => models.sequelize.sync({force: true})); // db 싱크 맞추기
    before(() => models.db.results.bulkCreate(newResults)); // db에 샘플 데이터 한꺼번에 집어넣기

    describe('성공시', () => {
        it.only('...', (done) => {
            request(app)
                .get('/api/results?paged=1&sortby=language&order=asc&lang=ko&cateogry=unknown')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
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