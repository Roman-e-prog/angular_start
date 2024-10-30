import {Router} from 'express';
import { deleteBlogmember, getAllBlogmembers, getBlogmember, updateBlogmember } from '../controller/blogmembersController';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleWares/jwtVerify';

const blogmembersRouter = Router();

blogmembersRouter.put('/:id', verifyTokenAndAuthorization, updateBlogmember);
blogmembersRouter.delete('/:id', verifyTokenAndAuthorization, deleteBlogmember);
blogmembersRouter.get('/find/:id', verifyTokenAndAuthorization, getBlogmember);
blogmembersRouter.get('/find', verifyTokenAndAdmin,  getAllBlogmembers);

export default blogmembersRouter;