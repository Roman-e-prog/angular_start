import pool from '../db/dbconnect';
import {Request, Response} from 'express'
export const adminmessagesPost = async (req:Request, res:Response)=>{
    const {username, user_id, usermessage_id, message, adminname, admin_id } = req.body
    try{
        const result = await pool.query(
            "INSERT INTO adminmessages (username, user_id, usermessage_id, message, adminname, admin_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*", [username, user_id, usermessage_id, message, adminname, admin_id, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
        )
        await pool.query(
            "UPDATE usermessages SET is_answered = true WHERE id = $1", [parseInt(usermessage_id)]
        )
        res.status(200).json(result.rows[0])
    } catch(err){
        res.status(403).json('Upload nicht möglich')
    }
}
export const adminmessagesPut = async (req:Request, res:Response)=>{
    const {message } = req.body
    const id = req.params.id;
    try{
        const result = await pool.query(
            "UPDATE adminmessages SET message = $1, updated_at = $2 WHERE id =$3", [message, new Date(new Date().toISOString()), id]
        )
        res.status(200).json(result.rows[0])
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const adminmessagesDelete = async (req:Request, res:Response)=>{
    const id = req.params.id;
    try{
        await pool.query(
            "DELETE FROM adminmessages WHERE id =$1", [id]
        )
        res.status(200).json(`Nachricht mit der id ${id} wurde gelöscht`)
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const adminmessagesGet = async (req:Request, res:Response)=>{
    const id = req.params.id;
    try{
        const result = await pool.query(
            "SELECT * FROM adminmessages WHERE id = $1", [id]
        )
        res.status(200).json(result.rows[0])
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const adminmessagesGetAll = async (req:Request, res:Response)=>{
    try{
        const result = await pool.query(
            "SELECT * FROM adminmessages",
        )
        res.status(200).json(result.rows)
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const adminmessagesGetAllForUser = async (req:Request, res:Response)=>{
    const id = req.params.id
    try{
        const result = await pool.query(
            "SELECT * FROM adminmessages WHERE user_id = $1", [id],
        )
        res.status(200).json(result.rows)
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
