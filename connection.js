"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedatasets = exports.updatedatasets = exports.createdatasets = exports.getdatasetsbyid = exports.getdatasets = void 0;
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'shruti',
    host: 'localhost',
    database: 'postgres',
    password: 'shruti',
    port: 5432,
});
pool.connect(function (error) {
    if (error) {
        console.log("not able to connect to db");
    }
    else {
        console.log("connected");
    }
});
//get all the datasets
const getdatasets = (req, res) => {
    pool.query('SELECT * FROM datasets', (error, results) => {
        if (error) {
            res.status(500).json({ error: "failed to connect to db" });
        }
        else {
            res.status(200).json(results.rows);
        }
        // else {
        //   res.status(500).json({ error: "failed to connect to db" })
        // }
    });
};
exports.getdatasets = getdatasets;
//get the specified dataset
const getdatasetsbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield pool.query('SELECT * FROM datasets where id=$1', [id], (error, results) => {
        if (!error) {
            if (results.rows.length == 0) {
                res.status(400).json({ error: "id not found" });
            }
            else {
                res.status(200).json(results.rows);
            }
        }
        else {
            res.status(500).json({ error: "failed to connect to db" });
        }
    });
});
exports.getdatasetsbyid = getdatasetsbyid;
//insert the datasets
const createdatasets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date } = req.body;
    let isrecexists = yield pool.query(`SELECT * FROM datasets where id = '${id}'`);
    if (isrecexists.rows.length > 0) {
        res.status(400).json({ "errorMessage": "id already exists" });
    }
    else
        pool.query('INSERT INTO datasets(id,data_schema,router_config,status,created_by,updated_by,created_date,updated_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date], (error, results) => {
            if (error) {
                res.status(400).json({ "error": "unable to insert the record" });
            }
            else {
                res.status(200).json({ "message": `Record added with ID: ${results.rows[0].id}` });
            }
        });
});
exports.createdatasets = createdatasets;
const updatedatasets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status, created_by } = req.body;
    let isrecexists = yield pool.query(`SELECT * FROM datasets where id = '${id}'`);
    if (isrecexists.rows.length == 0) {
        res.status(400).json({ "errorMessage": "id doesnot  exists" });
    }
    else
        yield pool.query('UPDATE datasets set status = $1,created_by=$2 where id =$3', [status, created_by, id], (error, results) => {
            {
                if (error) {
                    res.status(400).json({ "error": "unable to update the record" });
                }
                else {
                    res.status(200).json({ "message": `Record updated with ID:${id}` });
                }
            }
        });
});
exports.updatedatasets = updatedatasets;
const deletedatasets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let isrecexists = yield pool.query(`SELECT * FROM datasets where id = '${id}'`);
    let isalreadydeleted = yield pool.query(`SELECT * FROM datasets where id = '${id}'`);
    if (isalreadydeleted.rows.length == 0) {
        res.status(400).json({ "error": "id already deleted" });
    }
    else {
        yield pool.query('DELETE FROM datasets WHERE id = $1', [id], (error, results) => {
            res.status(200).json({ "message": `Record deleted with ID: ${id}` });
        });
    }
    ;
});
exports.deletedatasets = deletedatasets;
module.exports =
    {
        getdatasets: exports.getdatasets,
        getdatasetsbyid: exports.getdatasetsbyid,
        createdatasets: exports.createdatasets,
        updatedatasets: exports.updatedatasets,
        deletedatasets: exports.deletedatasets
    };
