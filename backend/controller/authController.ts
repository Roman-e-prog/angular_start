import pool from '../db/dbconnect';
import {Request, Response} from 'express'
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
const passgen = require('passgen');
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    host: '0.0.0.0',
    port:   1025,
})
var token = passgen.create(24);
export const register = async (req:Request, res:Response)=>{
    console.log('Iam here')
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(req.body.password, salt)
    const username = req.body.username;
    const vorname = req.body.vorname;
    const nachname = req.body.nachname;
    const email = req.body.email;
    const password = hash;
    const profilePicture = req.body.profilePicture;
    try{
        const result = await pool.query(
            "INSERT INTO blogmembers (username, vorname, nachname, email, password, profile_picture, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [username, vorname, nachname, email, password, profilePicture, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
        )
        res.status(200).json(result.rows[0])
    } catch(error){
        res.status(403).json('Registrierung nicht möglich')
    }
}
export const login = async(req:Request, res:Response)=>{
    const username = req.body.username
    const email = req.body.email
    try{
        await pool.query(
        "SELECT * from blogmembers WHERE username = $1",[username],(error, results)=>{
            if(error){
                throw new Error(error.message)
            }
            if(results.rows[0]){
                const correctPassword = bcrypt.compare(req.body.password, results.rows[0].password)
                const storedEmail = results.rows[0].email
                if(!correctPassword || storedEmail !== email){
                    res.json("Email oder Passwort sind falsch")
                }
                else{
                    const user = results.rows[0]
                    const sec = process.env.JWT_SEC as string;
                    const accessToken = jwt.sign(
                        {
                            id:user.id,
                            is_admin:user.is_admin
                        },
                        sec,
                        {expiresIn:'1h'}
                        )
                        const {id, vorname, nachname, username, email, is_admin, profile_picture, created_at,updated_at} = results.rows[0]
                        res.status(200).json({id, vorname, nachname, username, email, is_admin, profile_picture, created_at,updated_at, accessToken})
                }
            }
        }
    )
    } catch(error){
        console.log(error)
        res.status(403).json("Kein Login möglich")
    }
}

export const uniqueUsername = async (req:Request, res:Response)=>{
    const username = req.body.username;
    try{
        const result = await pool.query(
            "SELECT username FROM blogmembers WHERE username = $1", [username]
        )
        if(result.rows[0]){
            res.status(200).json(result.rows[0].username)
        }
        else{
            res.json(null)
        }
        
    } catch(error){
        res.status(403).json("request is impossible")
    }
}
export const uniqueEmail = async (req:Request, res:Response)=>{
    const email = req.body.email;
    console.log('triggered email', email)
    try{
        const result = await pool.query(
            "SELECT email FROM blogmembers WHERE email = $1", [email]
        )
        if(result.rows[0]){
            res.status(200).json(result.rows[0].email)
        }
        else{
            res.json(null)
        }
        
    } catch(error){
        res.status(403).json("request is impossible")
    }
}
export const forgotten = async (req:Request, res:Response) =>{
    const email = req.body.email;
    try{
        await pool.query(
            "Insert INTO forgotten (token, email) VALUES ($1, $2)",[token, email]
        )
        const url = `http://localhost:4200/reset/${token}`
        await transporter.sendMail({
            from:'admin@example.com',
            to:email,
            subject:'Reset your password',
            html: `Klicken Sie<a href="${url}"> hier</a> um Ihr Passwort zurückzusetzen`
        })
        res.status(200).json("Bitte öffnen Sie jetzt Ihre Email")
    } catch(error){
        res.status(404).json('Passwortreset nicht möglich')
    }
}
export const newPassword = async (req:Request,res:Response)=>{
    const token = req.body.token;
    const password = req.body.password;
    try{
        const result = await pool.query(
            "SELECT * FROM forgotten WHERE token = $1",[token]
        )
        const email = result.rows[0].email;
        await pool.query(
            "UPDATE blogmembers SET password=$1 WHERE email=$2",[password, email]
        )
        res.status(200).json('Ihr Passwort wurde erfolgreich geändert')
    } catch(error:any){
        res.status(404).json(error.message)
    }
}