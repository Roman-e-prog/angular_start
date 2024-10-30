import pool from '../db/dbconnect';

export const createForumthemesTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS forumthemes(
            id SERIAL PRIMARY KEY,
            ressort VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            views INTEGER DEFAULT 0,
            created_at DATE,
            updated_at DATE
        )`, (err:any, res:any)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("ForumthemesTable is successfully created")
        }
    })
}