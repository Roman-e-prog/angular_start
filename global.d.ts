import * as express from "express";
export interface User {
    id:string;
    vorname:string;
    nachname:string;
    username:string;
    email:string;
    password:string;
    is_admin:boolean;
    created_at: Date;
    updated_at: Date;
    accessToken?:string;
    refreToken?: string;
  }
declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}