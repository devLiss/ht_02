import {NextFunction, Request, Response} from "express";

export const authGuard = (req:Request, res:Response, next:NextFunction)=>
{
    const header = req.header('Authorization')
    if(!header){
        res.send(401)
    }
    // @ts-ignore
    const matchArr = header.match(/^Basic (.*)$/)
    if(!matchArr){ res.send(401)}
    // @ts-ignore
    const [login, passwd] = Buffer.from(matchArr[1], 'base64').toString().split(':');
    if (login === 'admin' && passwd==='qwerty') {
        next();
    }
    else{
        res.send(401)
    }
}