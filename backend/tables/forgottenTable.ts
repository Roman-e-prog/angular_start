import pool from "../db/dbconnect";

export const createForgottenTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS forgotten(
            token TEXT NOT NULL,
            email VARCHAR(255)
        )`, (err, res)=>{
            if(err){
                console.log(err.message)
            }
            else{
                console.log('ForgottenTable successfully created')
            }
        })
}