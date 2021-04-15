import {MONGO} from "../config/config";
import mongoose from 'mongoose'

export const connectDB = () => {
    return new Promise( (resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true);
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('database closed'))
            .once('open', () => resolve({status: true, message: 'mongo connected'}));
        mongoose.connect(MONGO, {useNewUrlParser: true, useUnifiedTopology: true})


    })
};
