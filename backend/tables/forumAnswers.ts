import pool from '../db/dbconnect';

export const createForumAnswersTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS forumAnswers(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            user_id INTEGER,
            is_admin BOOLEAN DEFAULT false,
            question_id INTEGER NOT NULL,
            answer TEXT NOT NULL,
            likes INTEGER DEFAULT 0 ,
            dislikes INTEGER DEFAULT 0 ,
            like_ids INTEGER[],
            dislike_ids INTEGER[],
            has_solved BOOLEAN DEFAULT false,
            answerername VARCHAR(255),
            answerer_id INTEGER,
            views INTEGER DEFAULT 0,
            created_at DATE,
            updated_at DATE
        )`, (err:any, res:any)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("Forumanswers table is successfully created")
        }
    })
}