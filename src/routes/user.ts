import express, {Router} from "express";
const router: Router = express();
import {registerUser, authUser, getUserByUsername, updateUser, confirmPassword} from "../controllers/user";
import passport from "passport";


router.post('/register', registerUser);
router.post('/auth', authUser);
router.get('/:username', passport.authenticate('jwt', {session: false}), getUserByUsername);
router.patch('/:username', passport.authenticate('jwt', {session: false}), updateUser);
router.post('/', confirmPassword)

export default router
