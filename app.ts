import express from "express";
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

const app = express()
const port = 3004


import { getdatasets } from './connection';
import { getdatasetsbyid } from './connection';
import { createdatasets } from './connection';
import { updatedatasets } from './connection';
import { deletedatasets } from './connection';

app.get('/', (req: Request, res: Response) => {
  res.json({ "info": "this is datasets database" })
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/datasets', getdatasets)
app.get('/datasets/:id', getdatasetsbyid)
app.post('/datasets', createdatasets)
app.patch('/datasets/:id', updatedatasets) 
app.delete('/datasets/:id', deletedatasets)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})  