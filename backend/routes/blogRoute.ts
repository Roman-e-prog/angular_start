import {Router} from 'express';
import upload from '../utils/multer';
import { createBlog, deleteBlogpost, getAllBlogposts, getBlogpost, updateBlog } from '../controller/blogController';
import { verifyTokenAndAdmin } from '../middleWares/jwtVerify';

const blogRouter = Router();

blogRouter.post('/', upload.array('images'), createBlog);
blogRouter.put('/:id', upload.array('images'), updateBlog);
blogRouter.delete('/:id', deleteBlogpost);
blogRouter.get('/find/:id', getBlogpost);
blogRouter.get('/find', getAllBlogposts);

export default blogRouter;