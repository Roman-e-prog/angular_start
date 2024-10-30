import {Router} from 'express';
import { createForumtheme, deleteForumtheme, getAllForumthemes, getForumtheme, updateForumtheme } from '../controller/forumThemesController';
import { verifyTokenAndAdmin } from '../middleWares/jwtVerify';

const forumthemesRouter = Router();

forumthemesRouter.post('/', verifyTokenAndAdmin, createForumtheme);
forumthemesRouter.put('/:id', verifyTokenAndAdmin, updateForumtheme);
forumthemesRouter.delete('/:id', verifyTokenAndAdmin, deleteForumtheme);
forumthemesRouter.get('/find/:id', getForumtheme);
forumthemesRouter.get('/find', getAllForumthemes);

export default forumthemesRouter;