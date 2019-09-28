import passport from 'passport';
import './env';
import {OAuth2Strategy} from 'passport-google-oauth';

const auth = passportInstance => {
    passportInstance.serializeUser((user, done) => {
        done(null, user);
    });
    passportInstance.deserializeUser((user, done) => {
        done(null, user);
    });
    passportInstance.use(new OAuth2Strategy({
        clientID: process.env.GOOGLE_AUTH_ID || '',
        clientSecret: process.env.GOOGLE_AUTH_SECRET || '',
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL || ''
    },
    (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });
    }));
    
    return passportInstance;
}

export default auth(passport);