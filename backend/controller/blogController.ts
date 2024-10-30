import pool from '../db/dbconnect';
import {Request, Response} from 'express';
import cloudinary from '../utils/cloudinary';
export const createBlog = async (req:Request, res:Response)=>{
    const {blog_title, blog_content, blog_theme, blog_author} = req.body;
    const files = req.files as Express.Multer.File[];
    
    if(files){
        const cloudinary_ids: String[] = [];
        const secure_urls: String[] = [];

        for(let file of files){
            const path = file.path.replace(/\\/g, '/')
            const result = await cloudinary.uploader.upload(path, {
                folder:'angular_start',
                resource_type:'auto'
            })
            cloudinary_ids.push(result.public_id);
            secure_urls.push(result.secure_url);
        }
        try{
            const result = await pool.query(
                "INSERT INTO blog (blog_title, blog_content, blog_theme, blog_author, cloudinary_ids, images, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [blog_title, blog_content, blog_theme, blog_author, cloudinary_ids, secure_urls,  new Date(new Date().toISOString()), new Date(new Date().toISOString())]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(403).json('Upload impossible')
        }
    } 
    else{
        try{
            const result = await pool.query(
                "INSERT INTO blog (blog_title, blog_content, blog_theme, blog_author, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING*", [blog_title, blog_content, blog_theme, blog_author, new Date(new Date().toISOString()), new Date(new Date().toISOString())]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(403).json('Upload impossible')
        }
    }
}
export const updateBlog = async (req:Request, res:Response)=>{
    const {blog_title, blog_content, blog_theme, blog_author} = req.body;
    const files = req.files as Express.Multer.File[];
    const index = req.body.index;
    const keys: number[]= [];
    const id = req.params.id;
    let storedBlogpost;
    try{
        const result = await pool.query(
            "SELECT * FROM blog WHERE id = $1", [id]
        )
        storedBlogpost = result.rows[0]
    } catch(error){
        res.status(404).json('Nicht gefunden')
    }
    if(files && files.length){
        Object.values(index).forEach((ind:any)=>{
            keys.push(parseInt(ind))
        })
        for(let i = 0; i < files.length; i++){
            const file = files[i];
            const path = file.path.replace(/\\/g, '/');
            const fileIndex = keys[i];
                if(storedBlogpost.cloudinary_ids[fileIndex]){
                    cloudinary.uploader.destroy(storedBlogpost.cloudinary_ids[fileIndex])
                }
                const uploadResult = await cloudinary.uploader.upload(path, {
                      folder:'angular_start',
                      resource_type:'auto'
                })
                if(storedBlogpost && storedBlogpost.images){
                    storedBlogpost.images[fileIndex] = uploadResult.secure_url
                }
                if(storedBlogpost && storedBlogpost.cloudinary_ids){
                    storedBlogpost.cloudinary_ids[fileIndex] = uploadResult.public_id
                }
        }
        try{
            const result = await pool.query(
                "UPDATE blog SET blog_title = $1, blog_content = $2, blog_theme = $3, blog_author = $4, cloudinary_ids = $5, images = $6, updated_at = $7 WHERE id = $8", [blog_title, blog_content, blog_theme, blog_author, storedBlogpost.cloudinary_ids, storedBlogpost.images, new Date(new Date().toISOString()), id]
            )
            res.status(200).json(result.rows[0])
        } catch(error){
            res.status(404).json('Nicht gefunden')
        }
    }
    else{
        try{
            const result = await pool.query(
                "UPDATE blog SET blog_title = $1, blog_content = $2, blog_theme = $3, blog_author = $4,updated_at = $5 WHERE id = $6", [blog_title, blog_content, blog_theme, blog_author, new Date(new Date().toISOString()), id]
            )
            res.status(200).json(result.rows[0])
        } catch(error:any){
            res.status(404).json('Nicht gefunden')
        }
    } 
}

export const deleteBlogpost = async (req:Request, res:Response)=>{
    const id = req.params.id;
    let publicIds;
    try{
        const result = await pool.query(
            "SELECT cloudinary_ids FROM blog WHERE id = $1",[id]
        )
        publicIds = result.rows[0].cloudinary_ids 
        cloudinary.uploader.destroy(publicIds)
        await pool.query(
            "DELETE FROM blog WHERE id = $1",[id]
        )
        res.status(200).json(`Blogpost mit der Id ${id} wurde gelöscht`)
    } catch(error){
        res.status(500).json('Nicht möglich diesen Beitrag zu löschen')
    }
}
export const getBlogpost = async (req:Request, res:Response)=>{
    const id = req.params.id
    try{
        const result = await pool.query(
            "SELECT * FROM blog WHERE id = $1",[id]
        )
        res.status(200).json(result.rows[0])
    } catch(error){
        res.status(404).json("Nicht gefunden")
    }
}
export const getAllBlogposts = async (req:Request, res:Response)=>{
    try{
        const result = await pool.query(
            "SELECT * FROM blog"
        )
        res.status(200).json(result.rows)
    } catch(error:any){
        res.status(404).json(error.message)
    }
}

