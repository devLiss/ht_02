import {Request, Response, Router} from "express";
import {postRepo} from "../repositories/post-repo";
import {authGuard} from "../middlewares/authGuard";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {
    postBlogIdValidation,
    postContentValidation,
    postShortDescrValidation,
    postTitleValidation
} from "../middlewares/middlewares";

export const postsRouter = Router({})


postsRouter.get('/', (req:Request, res:Response)=>{
    const data = postRepo.findAllPosts();
    res.status(200).send(data);
})
postsRouter.post('/', authGuard, postTitleValidation,postShortDescrValidation, postContentValidation, postBlogIdValidation,inputValidationMiddleware, (req:Request, res:Response)=>{
    const post = postRepo.createPost(req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId);
    post ? res.status(201).send(post) : res.send(404)
})
postsRouter.get('/:id', (req:Request, res:Response)=>{
    const post = postRepo.findPostById(req.params.id);
    post ? res.status(200).send(post) : res.send(404)
})
postsRouter.put('/:id', authGuard, postTitleValidation,postShortDescrValidation, postContentValidation, postBlogIdValidation,inputValidationMiddleware,(req:Request, res:Response)=>{
    const isUpdated = postRepo.updatePost(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId)

    isUpdated ? res.send(204) : res.send(404)
})
postsRouter.delete('/:id', authGuard,(req:Request, res:Response)=>{
    const isDeleted = postRepo.deletePost(req.params.id);
    isDeleted ? res.send(204) : res.send(404);
})