import pool from '../db/dbconnect';
import {Request, Response} from 'express';
export const createForumAnswer = async (req:Request, res:Response)=>{
    const {
            username,
            user_id,
            question_id,
            answer,
            answerername,
            answerer_id
            } = req.body;
        try{
            const result = await pool.query(
                "INSERT INTO forumAnswers (username, user_id, question_id, answer, answerername, answerer_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*",[username, user_id, question_id, answer, answerername, answerer_id, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(403).json('Upload nicht möglich')
        }
}
export const updateForumAnswer = async (req:Request, res:Response)=>{
    const {
        answer,
        } = req.body;
        const id = req.params.id;
        try{
            const result = await pool.query(
                "UPDATE forumAnswers SET answer = $1, updated_at = $2 WHERE id = $3",[ answer, new Date(new Date().toISOString()), id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const deleteForumAnswer = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            await pool.query(
                "DELETE FROM forumAnswers WHERE id = $1",[id]
            )
            res.status(200).json(`Forumeintrag mit der id ${id} wurde gelöscht`)
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getForumAnswer = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            const result = await pool.query(
                "SELECT * FROM forumAnswers WHERE id = $1",[id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getAllForumAnswers = async (req:Request, res:Response)=>{
        try{
            const result = await pool.query(
                "SELECT * FROM forumAnswers"
            )
            res.status(200).json(result.rows)
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getAllAnswersToQuestion = async (req:Request, res:Response)=>{
    const question_id = req.params.id;
    try{
        const result = await pool.query(
            "SELECT * FROM forumAnswers WHERE question_id = $1", [question_id]
        )
        res.status(200).json(result.rows)
    } catch(error){
        res.status(404).json('Nicht gefunden')
    }
}
export const forumAnswerLikesCount = async (req:Request, res:Response)=>{
    const id = req.body.id
    const user_id = req.body.user_id
    try{
        await pool.query(
            "UPDATE forumAnswers SET likes = likes + 1, like_ids = array_append(like_ids, $2) WHERE id = $1",[id, user_id]
        )
    } catch(error){
        res.status(404).json('Not found')
    }
}
export const forumAnswerDislikesCount = async (req:Request, res:Response)=>{
    const id = req.body.id
    const user_id = req.body.user_id
    try{
        await pool.query(
            "UPDATE forumAnswers SET dislikes = dislikes + 1, dislike_ids = array_append(dislike_ids, $2) WHERE id = $1",[id, user_id]
        )
    } catch(error){
        console.log(error)
        res.status(404).json('Not found')
    }
}
export const forumAnswerSolved = async (req:Request, res:Response)=>{
    const id = req.body.id
    const question_id = req.body.question_id
    try{
        await pool.query(
            "UPDATE forumAnswers SET has_solved = true WHERE id = $1",[id]
        )
        await pool.query(
            "UPDATE forum SET solved = true WHERE id = $1",[question_id]
        )
    } catch(error){
        res.status(404).json('Not found')
    }
}