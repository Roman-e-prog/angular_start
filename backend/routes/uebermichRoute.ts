import {Router} from 'express';
import { createUebermich, deleteUebermich, getAllUebermich, getUebermich, updateUebermich } from '../controller/uebermichController';
import { verifyTokenAndAdmin } from '../middleWares/jwtVerify';

const uebermichRouter = Router();

uebermichRouter.post('/', verifyTokenAndAdmin, createUebermich);
uebermichRouter.put('/:id', verifyTokenAndAdmin, updateUebermich);
uebermichRouter.delete('/:id', verifyTokenAndAdmin, deleteUebermich);
uebermichRouter.get('/find/:id', getUebermich);
uebermichRouter.get('/find', getAllUebermich);

export default uebermichRouter;