// @ts-ignore
import express, {NextFunction, Request, Response} from 'express'
import bodyParser from "body-parser";
//import {videoRouter} from "./routes/videoRouter";
import {testingRouter} from "./routes/testingRouter";
import {blogsRouter} from "./routes/blogsRouter";
import {postsRouter} from "./routes/postsRouter";
const app = express()
const port = process.env.PORT || 5005

const authGuard = (req:Request, res:Response, next:NextFunction) => {
    if(req.body.login === 'admin' && req.body.password === 'qwerty'){
        next();
    }
    else
    {res.send(401)}
}

app.use(bodyParser.json());
app.get('/api/testing/all-data',(req:Request, res:Response)=>{
    res.status(204).send([]);
})
app.use('/ht02/api/blogs', blogsRouter)
app.use('/ht02/api/posts', postsRouter)
app.get('/',(req:Request, res:Response)=>{
    res.send('Hello!')
})
app.listen(port,()=>{
    console.log(`Listening port ${port}`);
})