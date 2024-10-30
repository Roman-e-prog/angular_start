import {Pool} from 'pg';
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'angular_blog',
    password: process.env.DB_PASSWORD,
    port:5432
})
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Database connection failed', err);
    } else {
        console.log('Database angular_blog connected successfully', res.rows);
    }
});
export default pool;