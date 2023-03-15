"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const app = (0, express_1.default)();
const port = 3004;
const connection_1 = require("./connection");
const connection_2 = require("./connection");
const connection_3 = require("./connection");
const connection_4 = require("./connection");
const connection_5 = require("./connection");
app.get('/', (req, res) => {
    res.json({ "info": "this is datasets database" });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get('/datasets', connection_1.getdatasets);
app.get('/datasets/:id', connection_2.getdatasetsbyid);
app.post('/datasets', connection_3.createdatasets);
app.patch('/datasets/:id', connection_4.updatedatasets);
app.delete('/datasets/:id', connection_5.deletedatasets);
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
