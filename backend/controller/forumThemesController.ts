import pool from '../db/dbconnect';
import {Request, Response} from 'express';
export const createForumtheme = async (req:Request, res:Response)=>{
    const {ressort,
            title,
            content,} = req.body;
            console.log(req.body, 'here body')
        try{
            const result = await pool.query(
                "INSERT INTO forumthemes (ressort, title, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",[ressort, title, content, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(403).json('Upload nicht möglich')
        }
}
export const updateForumtheme = async (req:Request, res:Response)=>{
    const {ressort,
            title,
            content,} = req.body;
        const id = req.params.id;
        try{
            const result = await pool.query(
                "UPDATE forumthemes SET ressort = $1, title = $2, content = $3, updated_at = $4 WHERE id = $5",[ressort, title, content, new Date(new Date().toISOString()), id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const deleteForumtheme = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            await pool.query(
                "DELETE FROM forumthemes WHERE id = $1",[id]
            )
            res.status(200).json(`Forumtheme mit der id ${id} wurde gelöscht`)
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getForumtheme = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            const result = await pool.query(
                "SELECT * FROM forumthemes WHERE id = $1",[id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getAllForumthemes = async (req:Request, res:Response)=>{
        try{
            const result = await pool.query(
                "SELECT * FROM forumthemes"
            )
            res.status(200).json(result.rows)
        } catch(error){
            console.log(error)
            res.status(404).json('Nicht gefunden')
        }
}