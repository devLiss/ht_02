import {Router, Request, Response, NextFunction} from "express";
import {blogsRepo} from "../repositories/blog-repo";
import {CustomValidator} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {authGuard} from "../middlewares/authGuard";
import {testingRouter} from "./testingRouter";
import {blogNameValidation, urlValidation} from "../middlewares/middlewares";
const { body} = require('express-validator');

export const blogsRouter = Router({})

blogsRouter.get('/',(req:Request, res:Response)=>{

    const data = blogsRepo.findAllBlogs();
    res.status(200).send(data);
})
blogsRouter.post('/',authGuard,blogNameValidation,urlValidation,inputValidationMiddleware,(req:Request, res:Response)=>{
const blog = blogsRepo.createBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(blog)
})

blogsRouter.get('/:id',(req:Request, res:Response)=>{
    const blog = blogsRepo.findBlogById(req.params.id);
    blog ? res.status(200).send(blog):res.send(404);
})
blogsRouter.put('/:id',authGuard,blogNameValidation,urlValidation,inputValidationMiddleware
    ,(req:Request, res:Response)=>{
    const isUpdated = blogsRepo.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl);
    isUpdated ? res.send(204) : res.send(404)
})
blogsRouter.delete('/:id',authGuard,(req:Request, res:Response)=>{
    const isDeleted = blogsRepo.deleteBlog(req.params.id)
    isDeleted ? res.send(204) : res.send(404)
})