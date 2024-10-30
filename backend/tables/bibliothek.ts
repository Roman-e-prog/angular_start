import pool from '../db/dbconnect';

export const creatBibliothekTable = ()=>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS bibliothek(
            id SERIAL PRIMARY KEY,
            bibliothek_title VARCHAR(255) NOT NULL,
            bibliothek_ressort VARCHAR(255) NOT NULL,
            bibliothek_url TEXT NOT NULL,
            created_at DATE,
            updated_at DATE
        )`, (err:any, res:any)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log('Bibliothektable successfully created')
        }
    })
}