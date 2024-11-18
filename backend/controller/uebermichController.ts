import pool from '../db/dbconnect';
import {Request, Response} from 'express';
export const createUebermich = async (req:Request, res:Response)=>{
    const {my_person} = req.body;

        try{
            const result = await pool.query(
                "INSERT INTO uebermich (my_person, created_at, updated_at) VALUES ($1, $2, $3) RETURNING *",[my_person, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(403).json('Upload nicht möglich')
        }
}
export const updateUebermich = async (req:Request, res:Response)=>{
    const {my_person} = req.body;
        const id = req.params.id;
        try{
            const result = await pool.query(
                "UPDATE uebermich SET my_person = $1, updated_at = $2 WHERE id = $3",[my_person, new Date(new Date().toISOString()), id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            console.log(error)
            res.status(404).json('Nicht gefunden')
        }
}
export const deleteUebermich = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            await pool.query(
                "DELETE FROM uebermich WHERE id = $1",[id]
            )
            res.status(200).json(`Uebermich mit der id ${id} wurde gelöscht`)
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getUebermich = async (req:Request, res:Response)=>{
        const id = req.params.id;
        try{
            const result = await pool.query(
                "SELECT * FROM uebermich WHERE id = $1",[id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}
export const getAllUebermich = async (req:Request, res:Response)=>{
        try{
            const result = await pool.query(
                "SELECT * FROM uebermich"
            )
            res.status(200).json(result.rows)
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
}