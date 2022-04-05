const db = require("../../models");
const Result = db.results;

// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

// pagination with filtering
const getResults = (req, res) => {
    // pagination
    const paged = req.query.paged;
    const _limit = 10;
    const _offset = (paged-1) * _limit; // 1페이지부터 시작

    // filtering
    const lang = req.query.lang;
    const cg = req.query.category;
    const sortby = req.query.sortby;
    const order = req.query.order; // asc OR desc

    Result
        .findAll({
        where: {
           language: lang,
            category: cg
        },
        order: [[`${sortby}`, `${order}`]],
        limit:_limit,
        offset:_offset
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving results.",
            });
        });
};

//// only pagination
// const getResults = (req, res) => {
//     const paged = req.query.paged;
//     const _limit = 10;
//     const _offset = (paged-1) * _limit; // 1페이지부터 시작
//
//     Result
//         .findAll({
//             limit:_limit,
//             offset:_offset
//         })
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving results.",
//             });
//         });
// };

const count = (req, res) => {
    try {
        db.sequelize.query("SELECT category, COUNT(title) AS count FROM Results GROUP BY category")
        .then(data => {
            res.json(data[0]);
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not count results.",
        });
    }
};

module.exports = {
    getResults,
    count
};