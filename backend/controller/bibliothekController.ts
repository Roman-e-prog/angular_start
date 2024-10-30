import pool from '../db/dbconnect';
import {Request, Response} from 'express';
export const createBiblothek = async (req:Request, res:Response)=>{
    const {bibliothek_title,
        bibliothek_ressort,
        bibliothek_url,} = req.body;
        try{
            const result = await pool.query(
                "INSERT INTO bibliothek (bibliothek_title, bibliothek_ressort, bibliothek_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",[bibliothek_title, bibliothek_ressort, bibliothek_url, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(403).json('Upload nicht möglich')
        }
}
export const updateBiblothek = async (req:Request, res:Response)=>{
    const {bibliothek_title,
        bibliothek_ressort,
        bibliothek_url,} = req.body;
        const id = req.params.id;
        try{
            const result = await pool.query(
                "UPDATE bibliothek SET bibliothek_title = $1, bibliothek_ressort = $2, bibliothek_url = $3, updated_at = $4 WHERE id = $5",[bibliothek_title, bibliothek_ressort, bibliothek_url, new Date(new Date().toISOString()), id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            console.log(error)
            res.status(404).json('Nicht gefunden')
        }
}
export const deleteBiblothek = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            await pool.query(
                "DELETE FROM bibliothek WHERE id = $1",[id]
            )
            res.status(200).json(`Bibliothek mit der id ${id} wurde gelöscht`)
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getBiblothek = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            const result = await pool.query(
                "SELECT * FROM bibliothek WHERE id = $1",[id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getAllBiblothek = async (req:Request, res:Response)=>{
        try{
            const result = await pool.query(
                "SELECT * FROM bibliothek"
            )
            res.status(200).json(result.rows)
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}