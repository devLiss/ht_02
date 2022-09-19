// @ts-ignore
import express, {NextFunction, Request, Response} from 'express'
import bodyParser from "body-parser";
import {blogsRouter} from "./routes/blogsRouter";
import {postsRouter} from "./routes/postsRouter";
const app = express()
const port = process.env.PORT || 5005

app.use(bodyParser.json());
app.delete('/testing/all-data',(req:Request, res:Response)=>{
    res.status(204).send([]);
})
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.get('/',(req:Request, res:Response)=>{
    res.send('Hello!')
})
app.listen(port,()=>{
    console.log(`Listening port ${port}`);
})