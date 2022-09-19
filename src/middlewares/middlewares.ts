import {CustomValidator} from "express-validator";

const {body} = require("express-validator");

const isValidUrl: CustomValidator = value => {
    if(!/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(value)){
        throw new Error('Неверный URL!')
    }
    else return true
};

export const blogNameValidation = body('name').trim(" ")
    .isLength({min:1, max:15}).withMessage('Поле не должно быть пустым и не должно превышать 15 символов')
export const urlValidation =  body('youtubeUrl')
    .custom(isValidUrl)
    .isLength({min:1, max:100}).withMessage('Поле не должно быть пустым и не должно превышать 100 символов')