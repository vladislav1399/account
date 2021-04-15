import express, {Application} from 'express'
import cors from 'cors'
import passport from "passport";
const app: Application  = express();


app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


import userRoutes from './routes/user'
import * as path from "path";
import {mode} from "./config/mode";
app.use('/user', userRoutes)


if(mode === 'prod') {
    app.use(express.static(path.join(__dirname, '../test-frontend/dist/test-frontend' )));
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, '..', 'test-frontend', 'dist', 'test-frontend', 'index.html'
            )
        )
    })
}

export default app;

