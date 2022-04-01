// const fs = require("fs");
// const mysql = require("mysql2"); // mysql
// const fastcsv = require("fast-csv");
//
// const upload = async (req, res) => {
//     try {
//         if (req.file == undefined) {
//             return res.status(400).send("Please upload a CSV file!");
//         }
//         let stream = fs.createReadStream("test.csv");
//         let csvData = [];
//         let csvStream = fastcsv
//             .parse()
//             .on("data", function (data) {
//                 csvData.push(data);
//             })
//             .on("end", function () {
//                 // remove the first line: header
//                 csvData.shift();
//                 // create a new connection to the database
//                 const connection = mysql.createConnection({
//                     host: "127.0.0.1",
//                     user: "root",
//                     password: "mysql",
//                     database: "darkweb-db"
//                 });
//                 // open the connection
//                 connection.connect(error => {
//                     if (error) {
//                         console.error(error);
//                     } else {
//                         let query =
//                             "INSERT INTO category (url,title,lang,category,site_tracking_codes,personal_information,etc,reference_url) VALUES ?";
//                         connection.query(query, [csvData], (error, response) => {
//                             console.log(error || response);
//                         });
//                     }
//                 });
//             });
//         stream.pipe(csvStream);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             message: "Could not upload the file: " + req.file.originalname,
//         });
//     }
// }


const db = require("../../models");
const Result = db.results;
const fs = require("fs");
const csv = require("fast-csv");
const CsvParser = require("json2csv").Parser;

const upload = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }
        let results = [];
        let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
        fs.createReadStream(path)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                results.push(row);
            })
            .on("end", () => {
                Result.bulkCreate(results)
                    .then(() => {
                        res.status(200).send({
                            message:
                                "Uploaded the file successfully: " + req.file.originalname,
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: "Fail to import data into database!",
                            error: error.message,
                        });
                    });
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

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

const download = (req, res) => {
    Result.findAll().then((objs) => {
        let results = [];

        objs.forEach((obj) => {
            const {
                id,
                url,
                title,
                lang,
                category,
                site_tracking_codes,
                personal_information,
                etc,
                reference_url
            } = obj;
            results.push({
                id,
                url,
                title,
                lang,
                category,
                site_tracking_codes,
                personal_information,
                etc,
                reference_url
            });
        });

        const csvFields = ["Id", "Url", "Title", "Lang", "Category", "Site_Tracking_Codes", "Personal_Information", "Etc", "Reference_Url"];
        const csvParser = new CsvParser({csvFields});
        const csvData = csvParser.parse(results);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=test.csv");

        res.status(200).end(csvData);
    });
};
module.exports = {
    upload,
    getResults,
    download
};