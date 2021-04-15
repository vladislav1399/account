import {createSchema, Type} from "ts-mongoose";
import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string
    password: string
}

export const UserSchema = createSchema({
    username: Type.string({required: true}),
    password: Type.string({required: true}),
});


UserSchema.statics.getUserByUsername = (username: string) => {
    return User.findOne({username: username}).then( user => {
        if(user) {
            return user
        } else {
            return  false
        }
    }).catch( (e: Error) => {
        return e
    })
};


UserSchema.statics.createUser = (user: IUser) => {
    return user.save().then( user => {
        if(user) {
            return user
        }
    }).catch( e => {
        return e.message
    })
};

UserSchema.statics.updateUser = (user: any, usernameQuery: string) => {
    return User.updateOne({username: usernameQuery}, {
        $set: {username: user.username, password: user.password}
    })
};


UserSchema.statics.updateUsername = (user: any, usernameQuery: string) => {
    return User.updateOne({username: usernameQuery}, {
        $set: {username: user.username}
    })
}

export const User = mongoose.model('UserTest', UserSchema);



