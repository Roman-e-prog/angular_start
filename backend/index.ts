import  express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createAdminmessagesTable } from './tables/adminmessages';
import { createBlogmemberTable } from './tables/blogMembers';
import { createBlogTable } from './tables/blogTable';
import { createForumTable } from './tables/forumTable';
import { createForumAnswersTable } from './tables/forumAnswers';
import { createForumthemesTable } from './tables/forumTheme';
import { createUebermichTable } from './tables/uebermichTable';
import { createusermessagesTable } from './tables/usermessages';
import { creatBibliothekTable } from './tables/bibliothek';
import path from 'path';
import adminmessagesRouter from './routes/adminmessagesRoute';
import authRouter from './routes/authRoute';
import bibliothekRouter from './routes/bibliothekRoute';
import blogmembersRouter from './routes/blogmembersRoute';
import blogRouter from './routes/blogRoute';
import forumAnswersRouter from './routes/forumAnswersRoute';
import forumRouter from './routes/forumRoute';
import forumthemesRouter from './routes/forumthemesRoute';
import uebermichRouter from './routes/uebermichRoute';
import usermessagesRouter from './routes/usermessageRouter';
import { createForgottenTable } from './tables/forgottenTable';

const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const port = process.env.SERVERPORT
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
createAdminmessagesTable();
creatBibliothekTable();
createBlogmemberTable();
createBlogTable();
createForumTable();
createForumAnswersTable();
createForumthemesTable();
createUebermichTable();
createusermessagesTable();
createForgottenTable();

app.use('/api/adminmessages', adminmessagesRouter)
app.use('/api/auth', authRouter)
app.use('/api/bibliothek', bibliothekRouter)
app.use('/api/blogMembers', blogmembersRouter)
app.use('/api/blog', blogRouter)
app.use('/api/forumAnswers', forumAnswersRouter)
app.use('/api/forum', forumRouter)
app.use('/api/forumthemes', forumthemesRouter)
app.use('/api/uebermich', uebermichRouter)
app.use('/api/usermessages', usermessagesRouter)
app.use(express.static(path.resolve(process.cwd(),'./frontend/src/' )))

//Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build'),{
        maxAge: '1y'
      }));
  
    app.get('*', (req, res) =>{
        // console.log(req.originalUrl)
        res.sendFile(
          path.resolve(__dirname, '../frontend/build/index.html'), {
            headers: {
                  'Cache-Control': 'no-store',
            },
          }
        )
      }
    );
  } 
  else {
    app.get('/', (req:Request, res:any) => res.send('Please send NODE_ENV to production'));
  }

  // app.use((req, res, next) => {
  //   console.log(`Asset requested: ${req.url}`);
  //   next();
  // });

app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`)
})