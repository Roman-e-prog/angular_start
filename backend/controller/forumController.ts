import pool from '../db/dbconnect';
import {Request, Response} from 'express';
export const createForum = async (req:Request, res:Response)=>{
    const {username,
            user_id,
            question_ressort,
            question_theme,
            question} = req.body;
        try{
            const result = await pool.query(
                "INSERT INTO forum (username, user_id, question_ressort, question_theme, question, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",[username, user_id, question_ressort, question_theme, question, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(403).json('Upload nicht möglich')
        }
}
export const updateForum = async (req:Request, res:Response)=>{
    const {
        question_theme,
        question} = req.body;
        const id = req.params.id;
        try{
            const result = await pool.query(
                "UPDATE forum SET question_theme =$1, question = $2, updated_at = $3 WHERE id = $4",[question_theme, question, new Date(new Date().toISOString()), id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const deleteForum = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            await pool.query(
                "DELETE FROM forum WHERE id = $1",[id]
            )
            res.status(200).json(`Forumeintrag mit der id ${id} wurde gelöscht`)
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getForum = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            const result = await pool.query(
                "SELECT * FROM forum WHERE id = $1",[id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getAllForum = async (req:Request, res:Response)=>{
        try{
            const result = await pool.query(
                "SELECT * FROM forum"
            )
            res.status(200).json(result.rows)
        } catch(error){
            console.log(error)
            res.status(404).json('Nicht gefunden')
        }
}
export const forumViewsCount = async (req:Request, res:Response)=>{
    const id = req.body.id
    try{
        await pool.query(
            "UPDATE forum SET views = views + 1 WHERE id = $1",[id]
        )
    } catch(error){
        console.log(error)
        res.status(404).json('Not found')
    }
}
export const forumLikesCount = async (req:Request, res:Response)=>{
    const id = req.body.id
    const user_id = req.body.user_id
    try{
        await pool.query(
            "UPDATE forum SET likes = likes + 1, like_ids = array_append(like_ids, $2) WHERE id = $1",[id, user_id]
        )
    } catch(error){
        console.log(error)
        res.status(404).json('Not found')
    }
}
export const forumDislikesCount = async (req:Request, res:Response)=>{
    const id = req.body.id
    const user_id = req.body.user_id
    try{
        await pool.query(
            "UPDATE forum SET dislikes = dislikes + 1, dislike_ids = array_append(dislike_ids, $2) WHERE id = $1",[id, user_id]
        )
    } catch(error){
        res.status(404).json('Not found')
    }
}
export const getAllUserForum = async (req:Request, res:Response)=>{
    const id = req.params.id;
    try{
        const result = await pool.query(
            "SELECT * FROM forum WHERE user_id = $1", [id]
        )
        res.status(200).json(result.rows)
    } catch(error){
        res.status(404).json('Keine Fragen gefunden')
    }
}