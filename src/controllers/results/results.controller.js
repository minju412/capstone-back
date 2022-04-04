const db = require("../../models");
const Result = db.results;

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
        db.sequelize.query("SELECT category, COUNT(title) AS count FROM Results GROUP BY category")
        .then(data => {
            // res.send(data);
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