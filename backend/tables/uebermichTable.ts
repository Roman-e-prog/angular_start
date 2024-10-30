import pool from '../db/dbconnect';

export const createUebermichTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS uebermich(
            id SERIAL PRIMARY KEY,
            my_person TEXT NOT NULL,
            created_at DATE,
            updated_at DATE
        )`, (err:any, res:any)=>{
            if(err){
                console.log(err.message)
            }
            else{
                console.log("Table uebermich is successfully created")
            }
        })
}