import {Router} from 'express';
import upload from '../utils/multer';
import { createBlog, deleteBlogpost, getAllBlogposts, getBlogpost, updateBlog } from '../controller/blogController';
import { verifyTokenAndAdmin } from '../middleWares/jwtVerify';

const blogRouter = Router();

blogRouter.post('/', verifyTokenAndAdmin, upload.array('images'), createBlog);
blogRouter.put('/:id', verifyTokenAndAdmin, upload.array('images'), updateBlog);
blogRouter.delete('/:id', verifyTokenAndAdmin, deleteBlogpost);
blogRouter.get('/find/:id', getBlogpost);
blogRouter.get('/find', getAllBlogposts);

export default blogRouter;