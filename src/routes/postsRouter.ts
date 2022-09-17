import {Request, Response, Router} from "express";
import {postRepo} from "../repositories/post-repo";
import {authGuard} from "../middlewares/authGuard";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";

export const postsRouter = Router({})

const postTitleValidation = body('title')
                                .isLength({min:1, max:30}).withMessage('Поле не должно быть пустым или быть больше 30 символов')
const postShortDescrValidation = body('shortDescription')
                                .isLength({min:1, max:100}).withMessage('Поле не должно быть пустым или быть больше 100 символов')
const postContentValidation = body('content')
                                .isLength({min:1, max:1000}).withMessage('Поле не должно быть пустым или быть больше 1000 символов')
const postBlogIdValidation = body('blogId').isString().withMessage('Поле должно быть строкой')
postsRouter.get('/', (req:Request, res:Response)=>{
    const data = postRepo.findAllPosts();
    res.status(200).send(data);
})
postsRouter.post('/', postTitleValidation,postShortDescrValidation, postContentValidation, postBlogIdValidation,inputValidationMiddleware, (req:Request, res:Response)=>{
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
postsRouter.put('/:id', postTitleValidation,postShortDescrValidation, postContentValidation, postBlogIdValidation,inputValidationMiddleware,(req:Request, res:Response)=>{
    const isUpdated = postRepo.updatePost(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId)

    isUpdated ? res.send(204) : res.send(404)
})
postsRouter.delete('/:id', (req:Request, res:Response)=>{
    const isDeleted = postRepo.deletePost(req.params.id);
    isDeleted ? res.send(204) : res.send(404);
})