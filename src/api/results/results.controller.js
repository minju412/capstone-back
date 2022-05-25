const db = require("../../models");
const Result = db.results;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// pagination with filtering
const getResults = async (req, res) => {
    // pagination
    const paged = req.query.paged;
    const _limit = 10;
    const _offset = (paged-1) * _limit; // 1페이지부터 시작

    // filtering
    const lang = req.query.lang;
    const cg = req.query.category;
    const sortby = req.query.sortby;
    const order = req.query.order; // asc OR desc
    const title = req.query.title;
    const url = req.query.url;

    const category_attr = {};
    if ( cg ) {
        category_attr[Op.eq]= cg;
    } else {
        category_attr[Op.not]= null;
    }
    const lang_attr = {};
    if ( lang ) {
        lang_attr[Op.eq]= lang;
    } else {
        lang_attr[Op.not]= null;
    }
    const title_attr = {};
    if ( title ) {
        title_attr[Op.like]= `%${title}%`;
    } else {
        title_attr[Op.not]= null;
    }
    const url_attr = {};
    if ( url ) {
        url_attr[Op.like]= `%${url}%`;
    } else {
        url_attr[Op.not]= null;
    }

    await Result
        .findAll({
        where: {
            language: lang_attr,
            category: category_attr,
            title: title_attr,
            url: url_attr,
        },
        raw : true,
        order: [[`${sortby}`, `${order}`]],
        limit:_limit,
        offset:_offset
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "결과를 가져오는 도중에 에러가 발생했습니다.",
            });
        });
};

const count = (req, res) => {
    db.sequelize.query("SELECT category, COUNT(title) AS count FROM Results GROUP BY category")
        .then(data => {
            res.status(200).json(data[0]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "결과를 카운트 할 수 없습니다.",
            });
        })
};

module.exports = {
    getResults,
    count
};