import { json } from 'express'; //db connection
import { Request,Response } from "express"

var Pool = require('pg').Pool
var pool = new Pool({
  user: 'shruti',
  host: 'localhost',
  database: 'postgres',
  password: 'shruti',
  port: 5432,
})
pool.connect(function (error:string) {

  if (error) {
    console.log("not able to connect to db");
  }
  else {
    console.log("connected")
  }
})

//get all the datasets

export const getdatasets = (req:Request, res:Response) => {
  pool.query('SELECT * FROM datasets', (error:any, results:any) => {
    
      if (error) {
      
        res.status(500).json({ "error": "failed to connect to db" })
      }
      else{
      res.status(200).json(results.rows)
      }
    // else {
    //   res.status(500).json({ error: "failed to connect to db" })
    // }
   } );
};

//get the specified dataset

export const getdatasetsbyid = async (req:Request, res:Response) => {
  const id = req.params.id
  

  await pool.query('SELECT * FROM datasets where id=$1', [id], (error: any, results: { rows: string | any[]; }) => {

    if (!error) {
      if (results.rows.length == 0) {
        res.status(400).json({ "error": "id not found" });
      }
      else {
        res.status(200).json(results.rows)
      }
    }
    else {
      res.status(500).json({ "error": "failed to connect to db" })
    }
  });
};

//insert the datasets

export const createdatasets = async (req:Request, res:Response) => {
  const { id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date } = req.body;

let isrecexists:any = await pool.query(`SELECT * FROM datasets where id = '${id}'`)
  if (isrecexists.rows.length > 0) {
    res.status(400).json({ "error": "id already exists" })
  }
  else
    pool.query
      ('INSERT INTO datasets(id,data_schema,router_config,status,created_by,updated_by,created_date,updated_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date],
        (error: any, results: { rows: { id: any; }[]; }) => {
        
          if (error) {
            res.status(400).json({ "error": "unable to insert the record" });
          }
          else {
            res.status(200).json({ "message": `Record added with ID: ${results.rows[0].id}` });
          }

        }
      );
};

export const updatedatasets =async(req:Request,res:Response) => {
  const id =req.params.id;
   const{status,created_by}=req.body;
  
   let isrecexists = await pool.query(`SELECT * FROM datasets where id = '${id}'`)
   if (isrecexists.rows.length == 0) {
     res.status(400).json({ "error": "id doesnot  exists" })
   }
   else
    await pool.query('UPDATE datasets set status = $1,created_by=$2 where id =$3',[status,created_by,id],(error: any, results: any) => {
    {
      if(error)
      {
        
        res.status(400).json({"error": "unable to update the record"})
      }
        else
        {
        res.status(200).json({"message":`Record updated with ID:${id}`})
        }
      
    
    }
  }
  );
  }
export const deletedatasets = async (req:Request, res:Response) => {
  const id = req.params.id;
  let isrecexists = await pool.query(`SELECT * FROM datasets where id = '${id}'`)
 let isalreadydeleted:any = await pool.query(`SELECT * FROM datasets where id = '${id}'`)
  if (isalreadydeleted.rows.length == 0) {
  
    res.status(400).json({ "error": "id already deleted" })
    
  }
  else {
    await pool.query('DELETE FROM datasets WHERE id = $1', [id], (error: any, results: any) => {
      
        
        
         res.status(200).json({ "message": `Record deleted with ID: ${id}` })
         
      }
     
    
    )
  }
  ;
};





module.exports =
{
  getdatasets,
  getdatasetsbyid,
  createdatasets,
  updatedatasets,
  deletedatasets

}
