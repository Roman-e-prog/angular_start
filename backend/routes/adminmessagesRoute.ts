import {Router} from 'express';
import { adminmessagesDelete, adminmessagesGet, adminmessagesGetAll, adminmessagesGetAllForUser, adminmessagesPost, adminmessagesPut } from '../controller/adminmessagesController';
import { verifyTokenAndAdmin } from '../middleWares/jwtVerify';
const adminmessagesRouter = Router();

adminmessagesRouter.post('/', verifyTokenAndAdmin,  adminmessagesPost);
adminmessagesRouter.put('/:id', verifyTokenAndAdmin, adminmessagesPut);
adminmessagesRouter.delete('/:id', verifyTokenAndAdmin, adminmessagesDelete);
adminmessagesRouter.get('/find/:id', adminmessagesGet);
adminmessagesRouter.get('/find', adminmessagesGetAll);
adminmessagesRouter.get('/getUserAdminMessages/:id', adminmessagesGetAllForUser);

export default adminmessagesRouter;