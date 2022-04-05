const db = require("../../models");
const Result = db.results;

const getResults = (req, res) => {
    const pageInfo = req.query;
    const paged = parseInt(pageInfo.paged);
    // const itemsPerPage = parseInt(pageInfo.itemsPerPage);
    // const _limit = itemsPerPage;

    const _limit = 10;
    const _offset = (paged-1) * _limit; // 1페이지부터 시작

    Result.findAll({limit:_limit, offset:_offset})
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