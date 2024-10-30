import {Router} from 'express';
import { usermessagesDelete, usermessagesGet, usermessagesGetAll, usermessagesPost, usermessagesPut } from '../controller/usermessagesController';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleWares/jwtVerify';

const usermessagesRouter = Router();

usermessagesRouter.post('/', verifyTokenAndAuthorization, usermessagesPost);
usermessagesRouter.put('/:id', verifyTokenAndAuthorization, usermessagesPut);
usermessagesRouter.delete('/:id', verifyTokenAndAdmin, usermessagesDelete);
usermessagesRouter.get('/find/:id', usermessagesGet);
usermessagesRouter.get('/find',  usermessagesGetAll);

export default usermessagesRouter;