import {Request, Response} from "express";
import {IUser, UserSchema, User} from "../models/User";
import {genSalt, hashSync, compareSync} from 'bcryptjs'
import {jwt} from "../config/config";
import {sign} from "jsonwebtoken";


export const registerUser = (req: Request, res: Response) => {
    const {username, password} = req.body;
    UserSchema.statics.getUserByUsername(username).then( (user: IUser) => {
        if(user) {
            res.status(200).json({status: false, message: `User with this ${username} already exists`})
        } else {
            genSalt(10).then( num => {
                const saltPassword: string = hashSync(password, num);
                const newUser: any = new User({
                    username: username,
                    password: saltPassword
                })
                UserSchema.statics.createUser(newUser).then( (createdUser: IUser) => {
                    if(createdUser) {
                        res.status(200).json({status: true, message: 'Account was successfully registered'})
                    } else {
                        res.status(200).json({status: false, message: 'Created user to failed'})
                    }
                })
            })
        }
    })
}


export const authUser = (req: Request, res: Response) => {
        const { username, password } = req.body;
        UserSchema.statics.getUserByUsername(username).then((user: IUser) => {
            if (user) {
                const passwordAuth = compareSync(password, user.password);
                    if(passwordAuth) {
                       const token = sign({
                           id: user._id,
                           username: user.username,
                       }, jwt, {expiresIn: 60 * 60})
                        res.status(200).json({status: true, token: `Bearer ${token}`})
                    } else {
                        res.status(200).json({status: false, message: "password is incorrect"});
                    }
            }   else {
                     res.status(200).json({status: false, message: 'User with this username is not found'})
    }
        })
}

export const getUserByUsername = (req: Request, res: Response) => {
    const {username} = req.params;

    UserSchema.statics.getUserByUsername(username).then( (user: IUser) => {
        if(user) {
            res.status(200).json({status: true, user: user})
        } else {
            res.status(200).json({status: false, message: 'User with this username is not found'})
        }
    }).catch( (e: any) => console.log(e))
}


export const updateUser = (req: Request, res: Response) => {
    const usernameQuery = req.params.username;
        const {username, password, newPassword} = req.body
    console.log(req.body)

    if(newPassword !== '') {
        genSalt(10).then( num => {
            const saltPassword: string = hashSync(newPassword, num);
            const user = {
                username: username,
                password: saltPassword
            }
            UserSchema.statics.updateUser(user, usernameQuery).then((result: any) => {
                if(result.nModified === 1 && result.ok === 1) {
                    res.status(200).json({status: true, message: 'user updated'})
                } else {
                    res.status(200).json({status: false, message: 'user is not updated'})
                }
            })
        })
    } else if (newPassword === '') {
        const user = {
            username: username
        }
        UserSchema.statics.updateUsername(user, usernameQuery).then((result: any) => {
            if(result.nModified === 1 && result.ok === 1) {
                res.status(200).json({status: true, message: 'user updated'})
            } else {
                res.status(200).json({status: false, message: 'user is not updated'})
            }
        })
    }
}


export const confirmPassword = (req: Request, res: Response) => {
    const {password, username} = req.body;
    UserSchema.statics.getUserByUsername(username).then((user: IUser) => {
        if(user) {
            const passwordAuth = compareSync(password, user.password);
            if(passwordAuth){
                res.status(200).json({status: true, message: ''})
            } else {
                res.status(200).json({status: false, message: 'Invalid password'})
            }
        }
    })
}
