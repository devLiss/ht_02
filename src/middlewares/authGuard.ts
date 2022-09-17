import {NextFunction, Request, Response} from "express";

export const authGuard = (req:Request, res:Response, next:NextFunction)=>
{
    const header = req.header('Authorization')
    if(header){
        const matchArr = header.match(/^Basic (.*)$/)
        if(matchArr) {
            const logoPass = Buffer.from(matchArr[1], 'base64').toString();
            console.log(logoPass.split(':')[1])
            const login = logoPass.split(':')[0];
            const passwd = logoPass.split(':')[1]
            if (login === 'admin' && passwd==='qwerty') {
                console.log('before next')
                next();
            }
        }else
        {
            res.send(401);
        }
    }else
    {
        res.send(401);
    }

}