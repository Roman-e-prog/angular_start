import pool from '../db/dbconnect';

export const createAdminmessagesTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS adminmessages(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL,
        usermessage_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        adminname VARCHAR(255),
        admin_id INTEGER NOT NULL,
        created_at DATE,
        updated_at DATE
        )`, (err:any, res:any)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("AdminmessagesTable is successfully created")
        }
    })
}