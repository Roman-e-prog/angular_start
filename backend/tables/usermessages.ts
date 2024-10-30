import pool from '../db/dbconnect';

export const createusermessagesTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS usermessages(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        is_answered BOOLEAN DEFAULT false,
        created_at DATE,
        updated_at DATE
        )`, (err:any, res:any)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("UsermessagesTable is successfully created")
        }
    })
}