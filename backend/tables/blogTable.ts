import pool from '../db/dbconnect';

export const createBlogTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS blog(
            id SERIAL PRIMARY KEY,
            blog_title TEXT NOT NULL,
            blog_content TEXT NOT NULL,
            blog_theme TEXT NOT NULL,
            blog_author VARCHAR(255) NOT NULL,
            cloudinary_ids TEXT[],
            images Text[],
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