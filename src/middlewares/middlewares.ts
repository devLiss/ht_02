import {CustomValidator} from "express-validator";

const {body} = require("express-validator");

const isValidUrl: CustomValidator = value => {
    if(!/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(value) || value.length > 100){
        throw new Error('Неверный URL!')
    }
    else return true
};

export const blogNameValidation = body('name').trim(" ")
    .isLength({min:1, max:15}).withMessage('Поле не должно быть пустым и не должно превышать 15 символов')
export const urlValidation =  body('youtubeUrl')
    .custom(isValidUrl)
export const postTitleValidation = body('title')
    .trim().isLength({min:1, max:30}).withMessage('Поле не должно быть пустым или быть больше 30 символов')

export const postShortDescrValidation = body('shortDescription')
    .trim().isLength({min:1, max:100}).withMessage('Поле не должно быть пустым или быть больше 100 символов')

export const postContentValidation = body('content')
    .trim().isLength({min:1, max:1000}).withMessage('Поле не должно быть пустым или быть больше 1000 символов')

export const postBlogIdValidation = body('blogId').trim().isLength({min:1, max:35}).withMessage('Поле должно быть строкой')