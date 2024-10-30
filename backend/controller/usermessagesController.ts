import pool from '../db/dbconnect';
import {Request, Response} from 'express'
export const usermessagesPost = async (req:Request, res:Response)=>{
    const {username, user_id, message,} = req.body
    try{
        const result = await pool.query(
            "INSERT INTO usermessages (username, user_id, message, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING*", [username, user_id, message, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
        )
        res.status(200).json(result.rows[0])
    } catch(err){
        res.status(403).json('Upload nicht möglich')
    }
}
export const usermessagesPut = async (req:Request, res:Response)=>{
    const {message } = req.body
    const id = req.params.id;
    try{
        const result = await pool.query(
            "UPDATE usermessages SET message = $1, updated_at = $2 WHERE id =$3", [message, new Date(new Date().toISOString()), id]
        )
        res.status(200).json(result.rows[0])
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const usermessagesDelete = async (req:Request, res:Response)=>{
    const id = req.params.id;
    try{
        await pool.query(
            "DELETE FROM usermessages WHERE id =$1", [id]
        )
        res.status(200).json(`Nachricht mit der id ${id} wurde gelöscht`)
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const usermessagesGet = async (req:Request, res:Response)=>{
    const id = req.params.id;
    try{
        const result = await pool.query(
            "SELECT * FROM usermessages WHERE id = $1", [id]
        )
        res.status(200).json(result.rows[0])
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const usermessagesGetAll = async (req:Request, res:Response)=>{
    try{
        const result = await pool.query(
            "SELECT * FROM usermessages",
        )
        res.status(200).json(result.rows)
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
