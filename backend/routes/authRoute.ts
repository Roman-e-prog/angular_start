import {Router} from 'express';
import { forgotten, login, newPassword, register, uniqueEmail, uniqueUsername } from '../controller/authController';

const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/uniqueUsername', uniqueUsername)
authRouter.get('/uniqueEmail', uniqueEmail)
authRouter.post('/forgotten', forgotten);
authRouter.post('/newPassword', newPassword);
export default authRouter;