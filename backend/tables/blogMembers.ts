import pool from '../db/dbconnect';

export const createBlogmemberTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS blogmembers(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        vorname VARCHAR(255) NOT NULL,
        nachname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        profile_picture VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        created_at DATE,
        updated_at DATE
        )`, (err:any, res:any)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("Table Blogmembers is successfully created")
        }
    })
}