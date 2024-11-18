import {Router} from 'express';
import { forgotten, login, newPassword, refreshToken, register, uniqueEmail, uniqueUsername } from '../controller/authController';

const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/uniqueUsername', uniqueUsername)
authRouter.post('/uniqueEmail', uniqueEmail)
authRouter.post('/forgotten', forgotten);
authRouter.post('/newPassword', newPassword);
authRouter.post('/refreshToken', refreshToken as any);
export default authRouter;