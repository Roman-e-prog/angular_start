import {Router} from 'express';
import { createBiblothek, deleteBiblothek, getAllBiblothek, getBiblothek, updateBiblothek } from '../controller/bibliothekController';
import { verifyTokenAndAdmin } from '../middleWares/jwtVerify';

const bibliothekRouter = Router();

bibliothekRouter.post('/', verifyTokenAndAdmin, createBiblothek);
bibliothekRouter.put('/:id', verifyTokenAndAdmin, updateBiblothek);
bibliothekRouter.delete('/:id', verifyTokenAndAdmin, deleteBiblothek);
bibliothekRouter.get('/find/:id', getBiblothek);
bibliothekRouter.get('/find', getAllBiblothek);

export default bibliothekRouter;