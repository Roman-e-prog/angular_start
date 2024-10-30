import {Router} from 'express';
import { createForumAnswer, deleteForumAnswer, forumAnswerDislikesCount, forumAnswerLikesCount, forumAnswerSolved, getAllAnswersToQuestion, getAllForumAnswers, getForumAnswer, updateForumAnswer } from '../controller/forumAnswersController';
import { verifyToken } from '../middleWares/jwtVerify';


const forumAnswersRouter = Router();

forumAnswersRouter.post('/', createForumAnswer);
forumAnswersRouter.put('/:id', updateForumAnswer);
forumAnswersRouter.delete('/:id', deleteForumAnswer);
forumAnswersRouter.get('/find/:id', getForumAnswer);
forumAnswersRouter.get('/find', getAllForumAnswers);
forumAnswersRouter.get('/findAllAnswersToQuestion/:id', getAllAnswersToQuestion);
forumAnswersRouter.post('/likes', forumAnswerLikesCount);
forumAnswersRouter.post('/dislikes', forumAnswerDislikesCount);
forumAnswersRouter.post('/hasSolved', forumAnswerSolved);

export default forumAnswersRouter;