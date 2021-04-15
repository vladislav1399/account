const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import {User} from "../models/User";
import {jwt} from '../config/config'


const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt
};

module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(options, async (payload: any, done: any) => {
            try {
                const user = await User.findOne({username: payload.username}).select('username id')
                if(user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            }catch (e) {

            }
        })
    )
};

