import pool from '../db/dbconnect';
import {Request, Response} from 'express'
export const updateBlogmember = async (req:Request, res:Response)=>{
    const {vorname, nachname} = req.body;
    const id = req.params.id;
    try{
       const result = await pool.query(
        "UPDATE blogmembers SET vorname = $1, nachname = $2, updated_at = $3 WHERE id = $4", [vorname, nachname, new Date(new Date().toISOString()), id]
       )
       res.status(200).json(result.rows[0])
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const deleteBlogmember = async (req:Request, res:Response)=>{
    const id = req.params.id;
    try{
         await pool.query(
        "DELETE FROM blogmembers WHERE id = $1", [id]
       )
       res.status(200).json(`Blogmember mit der id ${id} wurde gelöscht`)
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const getBlogmember = async (req:Request, res:Response)=>{
    const id = req.params.id;
    try{
        const result =  await pool.query(
        "SELECT * FROM blogmembers WHERE id = $1", [id]
       )
       res.status(200).json(result.rows[0])
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}
export const getAllBlogmembers = async (req:Request, res:Response)=>{
    try{
        const result =  await pool.query(
        "SELECT * FROM blogmembers",
       )
       res.status(200).json(result.rows)
    } catch(err){
        res.status(404).json('Nicht gefunden')
    }
}