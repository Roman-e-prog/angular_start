import pool from '../db/dbconnect';

export const createForumTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS forum(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            user_id INTEGER,
            is_admin Boolean DEFAULT false,
            question_ressort VARCHAR(255),
            question_theme TEXT NOT NULL,
            question TEXT NOT NULL,
            likes INTEGER DEFAULT 0 ,
            dislikes INTEGER DEFAULT 0 ,
            like_ids INTEGER[],
            dislike_ids INTEGER[],
            solved BOOLEAN DEFAULT false,
            views INTEGER DEFAULT 0,
            created_at DATE,
            updated_at DATE
        )`, (err:any, res:any)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("Forum table is successfully created")
        }
    })
}