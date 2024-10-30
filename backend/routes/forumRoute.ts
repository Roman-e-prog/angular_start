import {Router} from 'express';
import { createForum, deleteForum, forumDislikesCount, forumLikesCount, forumViewsCount, getAllForum, getAllUserForum, getForum, updateForum } from '../controller/forumController';
import { verifyTokenAndAuthorization } from '../middleWares/jwtVerify';


const forumRouter = Router();

forumRouter.post('/', createForum);
forumRouter.put('/:id', verifyTokenAndAuthorization, updateForum);
forumRouter.delete('/:id', verifyTokenAndAuthorization, deleteForum);
forumRouter.get('/find/:id', getForum);
forumRouter.get('/find', getAllForum);
forumRouter.post('/views', forumViewsCount);
forumRouter.post('/likes', forumLikesCount);
forumRouter.post('/dislikes', forumDislikesCount);
forumRouter.get('/allUserQuestions/:id', getAllUserForum);
export default forumRouter;