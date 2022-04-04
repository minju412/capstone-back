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

const download = (req, res) => {
    Result.findAll().then((objs) => {
        let results = [];

        objs.forEach((obj) => {
            const {
                thumbnail,
                id,
                url,
                title,
                language,
                category,
                site_tracking_codes,
                personal_information,
                others,
                reference_url
            } = obj;
            results.push({
                thumbnail,
                id,
                url,
                title,
                language,
                category,
                site_tracking_codes,
                personal_information,
                others,
                reference_url
            });
        });

        const csvFields = ["Thumbnail","Id", "Url", "Title", "Language", "Category", "Site_Tracking_Codes", "Personal_Information", "Others", "Reference_Url"];
        const csvParser = new CsvParser({csvFields});
        const csvData = csvParser.parse(results);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=test.csv");

        res.status(200).end(csvData);
    });
};

module.exports = {
    upload,
    download
};