import pool from '../db/dbconnect';
import {Request, Response} from 'express'
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
const passgen = require('passgen');
import nodemailer from 'nodemailer'
import { User } from '../../global';
const transporter = nodemailer.createTransport({
    host: '0.0.0.0',
    port:   1025,
})
var token = passgen.create(24);
  
export const register = async (req:Request, res:Response)=>{
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
//token functions
const sec = process.env.JWT_SEC as string;
const refreshSec = process.env.JWT_REFRESH_SEC as string;
const generateAccessToken = (user: object) => { return jwt.sign(user, sec, { expiresIn: '5m' }); }; 
const generateRefreshToken = (user:object) => { return jwt.sign(user, refreshSec, { expiresIn: '7d' }); };

export const login = async (req:Request, res:Response)=>{
    const username = req.body.username
    const email = req.body.email
    try{
        await pool.query(
        "SELECT * FROM blogmembers WHERE username = $1",[username],(error, results)=>{
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
                    const accessToken = generateAccessToken({ 
                        id:user.id,
                        is_admin:user.is_admin
                    })
                    const refreshToken = generateRefreshToken({ 
                        id:user.id,
                        is_admin:user.is_admin
                    })

                        const {id, vorname, nachname, username, email, is_admin, profile_picture, created_at,updated_at} = results.rows[0]
                        res.status(200).json({id, vorname, nachname, username, email, is_admin, profile_picture, created_at,updated_at, accessToken, refreshToken})
                    }
                }
            }
        )
    } catch(error){
        res.status(403).json("Kein Login möglich")
    }
}
export const refreshToken = (req: Request, res: Response)=>{
    try{
        const refreshSec = process.env.JWT_REFRESH_SEC as string;
        const refreshToken = req.body.refresh_token
        if (!refreshToken) return res.status(401).json("Not authenticated");
        jwt.verify(refreshToken, refreshSec, async (err: any, user:any) => { 
            if (err) return res.status(403).json("Invalid refresh token"); 
            const newAccessToken = generateAccessToken({ id: user.id, is_admin: user.is_admin }); 
            res.status(200).json({ accessToken: newAccessToken }); 
        });
    } catch(error){
        res.status(404).json('No refreshtoken found')
    }
}
//verify username and email
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
//password forgotten
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
