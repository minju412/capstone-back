const db = require("../../models");
const fs = require("fs");
const csv = require("fast-csv");
const Result = db.results;

// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

const getResults = (req, res) => {
    Result.findAll()
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
        Result.count({
            where: {category: req.query.category}})
            .then(data => {
                res.json([{ category: req.query.category, count: data }]);
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